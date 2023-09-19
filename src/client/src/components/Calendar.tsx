import { createSignal, onCleanup, onMount } from "solid-js";
import { Calendar } from "fullcalendar";

const CalendarComponent = () => {
  const [calendarEl, setCalendarEl] = createSignal<HTMLDivElement>();

  onMount(() => {
    if (calendarEl()) {
      const calendar = new Calendar(calendarEl(), {
        initialView: 'dayGridMonth',
        height: 500,
        events: [
          // Sample events
          { title: 'Event 1', start: '2023-09-06' },
          { title: 'Event 2', start: '2023-09-07' }
        ]
      });
      calendar.render();

      // Cleanup calendar instance when component gets destroyed
      onCleanup(() => {
        calendar.destroy();
      });
    }
  });

  return (
    <div ref={setCalendarEl}></div>
  );
};

export default CalendarComponent;
