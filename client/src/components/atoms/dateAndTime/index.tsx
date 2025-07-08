"use client";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";

const DateAndTime = ({ value }: { value: Date }) => {
  const [date, setDate] = useState<string | null>(null);
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    setDate(dayjs(value).format("YYYY MMM, DD"));
    setTime(dayjs(value).format("hh:mm A"));
  }, [value]);
  return (
    <div>
      <p className="text-foreground">{date}</p>

      <p className="text-sm text-muted-foreground">{time}</p>
    </div>
  );
};

export default DateAndTime;
