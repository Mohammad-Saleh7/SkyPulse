import { useEffect, useState } from "react";

type CityClock = {
  day: string;
  date: string;
  hour: string;
};

const useCityClock = (
  tzOffsetSec: number | undefined,
  language: string,
): CityClock => {
  const [clock, setClock] = useState<CityClock>({
    day: "",
    date: "",
    hour: "",
  });

  useEffect(() => {
    if (tzOffsetSec == null) {
      setClock({
        day: "",
        date: "",
        hour: "",
      });

      return;
    }

    const locale = language === "fa" ? "fa-IR" : "en-US";

    const updateClock = (): void => {
      const utcNowMs = Date.now();

      const cityNow = new Date(utcNowMs + tzOffsetSec * 1000);

      setClock({
        day: cityNow.toLocaleDateString(locale, {
          weekday: "long",
          timeZone: "UTC",
        }),

        date: cityNow.toLocaleDateString(locale, {
          month: "short",
          day: "2-digit",
          year: "numeric",
          timeZone: "UTC",
        }),

        hour: cityNow.toLocaleTimeString(locale, {
          hour: "numeric",
          minute: "2-digit",
          timeZone: "UTC",
        }),
      });
    };

    updateClock();

    const intervalId = window.setInterval(updateClock, 1000);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [tzOffsetSec, language]);

  return clock;
};

export default useCityClock;
