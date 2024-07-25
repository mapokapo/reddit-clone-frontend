import { SortBy, Timespan } from "@/client/requests";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Props = {
  filterMode: SortBy;
  setFilterMode: (mode: SortBy) => void;
  filterTimespan: Timespan;
  setFilterTimespan: (timespan: Timespan) => void;
};

const SelectFilterMode: React.FC<Props> = ({
  filterMode,
  setFilterMode,
  filterTimespan,
  setFilterTimespan,
}) => {
  return (
    <div className="flex gap-2">
      <Select
        defaultValue="top"
        value={filterMode}
        onValueChange={value => setFilterMode(value as SortBy)}>
        <SelectTrigger className="flex w-min justify-start gap-2 border-none">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="top">Top</SelectItem>
          <SelectItem value="new">New</SelectItem>
        </SelectContent>
      </Select>
      {filterMode === "top" && (
        <Select
          defaultValue="all-time"
          value={filterTimespan}
          onValueChange={value => setFilterTimespan(value as Timespan)}>
          <SelectTrigger className="flex w-min justify-between gap-2 border-none [&>span]:line-clamp-none [&>span]:text-nowrap">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all-time">All time</SelectItem>
            <SelectItem value="year">Last year</SelectItem>
            <SelectItem value="month">Last month</SelectItem>
            <SelectItem value="week">Last week</SelectItem>
          </SelectContent>
        </Select>
      )}
    </div>
  );
};

export default SelectFilterMode;
