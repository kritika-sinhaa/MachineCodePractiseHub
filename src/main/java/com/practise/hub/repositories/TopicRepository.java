package com.practise.hub.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import com.practise.hub.entities.Topic;
import java.util.List;

public interface TopicRepository extends JpaRepository<Topic, Long> {
    List<Topic> findAll();
    Topic save(Topic topic);
}
