package ltd.dmtech.mindbridge;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin
@RestController
public class HelloWorldController {

    @GetMapping("/hello")
    public String hello() {
        return "Hello world";
    }

}
