import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import styles from "../../styles/styles";
import EventCard from "./EventCard";

const Events = () => {
  const { allEvents, isLoading } = useSelector((state) => state.events);
 
  return (
    <div>
      {!isLoading && (
        <>
          {allEvents.length !== 0 && (
            <>
              <div className={`${styles.section}`}>
                <div className={`${styles.heading}`}>
                  <h1>Sự kiện khuyến mãi, giảm giá nổi bật</h1>
                </div>
              </div>

              <div className="w-full bg-[#f0f6f6] grid h-[55vh] overflow-x-auto hover:overflow-scroll">
                <div className={`${styles.section}`}>
                  <div className="">
                    {" "}
                    {allEvents &&
                      allEvents.map((allEvents, index) => (
                        <EventCard data={allEvents} />
                      ))}
                  </div>
                </div>
              </div>
            </>
          )}
          <h4>{allEvents?.length === 0 && null}</h4>
        </>
      )}
    </div>
  );
};

export default Events;
