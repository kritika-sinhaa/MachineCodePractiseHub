package com.practise.hub.controllers;

import com.practise.hub.entities.Topic;
import com.practise.hub.services.TopicService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/topics")
public class TopicController {
    @Autowired private TopicService topicService;

    @GetMapping
    public ResponseEntity<?> getAllTopics() {
        List<Topic> topics = topicService.getAllTopics();
        if (topics.size() < 1) {
            return ResponseEntity.ok("No topics available");
        }
        return ResponseEntity.ok(topics);
    }

    @PostMapping
    public Topic createTopic(@RequestBody Topic topic) {
        return topicService.createTopic(topic);
    }
}
