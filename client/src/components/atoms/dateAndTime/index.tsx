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
      <p className="text-[#111827]">{date}</p>
      <p className="text-sm text-[#6B7280]">{time}</p>
    </div>
  );
};

export default DateAndTime;
