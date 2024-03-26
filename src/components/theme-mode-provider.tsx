import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

type Theme = "dark" | "light" | "system";

type ThemeModeProviderProps = {
  defaultTheme?: Theme;
  storageKey?: string;
};

type ThemeModeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

const initialState: ThemeModeProviderState = {
  theme: "system",
  setTheme: () => null,
};

const ThemeModeProviderContext =
  createContext<ThemeModeProviderState>(initialState);

export const ThemeModeProvider: React.FC<
  ThemeModeProviderProps & PropsWithChildren
> = ({
  children,
  defaultTheme = "system",
  storageKey = "vite-ui-theme",
  ...props
}) => {
  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem(storageKey) as Theme) || defaultTheme
  );

  useEffect(() => {
    const root = window.document.documentElement;

    root.classList.remove("light", "dark");

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";

      root.classList.add(systemTheme);
      return;
    }

    root.classList.add(theme);
  }, [theme]);

  const value = useMemo(
    () => ({
      theme,
      setTheme: (theme: Theme) => {
        localStorage.setItem(storageKey, theme);
        setTheme(theme);
      },
    }),
    [theme, storageKey]
  );

  return (
    <ThemeModeProviderContext.Provider
      {...props}
      value={value}>
      {children}
    </ThemeModeProviderContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeModeProviderContext);

  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeModeProvider");

  return context;
};
