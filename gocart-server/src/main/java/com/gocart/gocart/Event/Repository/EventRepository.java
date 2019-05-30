package com.gocart.gocart.Event.Repository;

import com.gocart.gocart.Event.Entity.Event;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EventRepository extends JpaRepository<Event, Long> {

    @Query(value="SELECT * FROM g_event e " +
            "INNER JOIN g_event_users eu " +
            "ON e.event_id = eu.event_event_id " +
            "WHERE eu.users != :user_id", nativeQuery = true)
    List<Event> findOtherEvents(Long user_id);
}
