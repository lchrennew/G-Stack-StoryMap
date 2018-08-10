package chun.li.GStack.StoryMap.api.controllers;

import chun.li.GStack.StoryMap.api.MoveOptions;
import chun.li.GStack.StoryMap.api.domain.Card;
import chun.li.GStack.StoryMap.api.domain.Project;
import chun.li.GStack.StoryMap.api.domain.Release;
import chun.li.GStack.StoryMap.api.services.CardService;
import chun.li.GStack.StoryMap.api.services.ProjectService;
import chun.li.GStack.StoryMap.api.services.ReleaseService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import static org.springframework.http.HttpStatus.NO_CONTENT;

@Controller
@RequestMapping("cards")
public class CardController {
    private final CardService cardService;
    private final ProjectService projectService;
    private final ReleaseService releaseService;

    public CardController(CardService cardService, ProjectService projectService, ReleaseService releaseService) {
        this.cardService = cardService;
        this.projectService = projectService;
        this.releaseService = releaseService;
    }



    @PutMapping("{id}")
    @ResponseBody
    public Card update(@PathVariable Long id, @RequestBody Card card) {
        card.setId(id);
        return cardService.save(card);
    }

    @PostMapping("{to}/detail")
    @ResponseBody
    public Card createDetail(@PathVariable Long to, @RequestBody Card detail) {
        return cardService.createDetail(detail, to);
    }

    @PostMapping("{to}/plan/{releaseid}")
    @ResponseBody
    public Card createPlan(@RequestBody Card plan, @PathVariable Long to, @PathVariable Long releaseid) {
        return cardService.createPlan(plan, to, releaseid);
    }

    @DeleteMapping("{id}")
    @ResponseStatus(NO_CONTENT)
    public void delete(@PathVariable Long id) {
        cardService.delete(id);
    }


    @GetMapping("sandbox")
    @ResponseStatus(NO_CONTENT)
    public void sandbox() {
        Project project = new Project("DEMO");

        Release r1 = new Release("r1"),
                r2 = new Release("r2"),
                r3 = new Release("r3");
        project.addRelease(r1);
        project.addRelease(r2);
        project.addRelease(r3);
        projectService.save(project);
    }

    @PostMapping("{to}/next")
    @ResponseBody
    public Card createNext(@PathVariable Long to, @RequestBody Card next) {
        return cardService.createNext(next, to);
    }

    @PostMapping("root/{project}")
    @ResponseBody
    public Card createRoot(@RequestBody Card root, @PathVariable("project") Long to) {
        return cardService.createRoot(root, to);
    }

    @PostMapping("{id}/move")
    @ResponseStatus(NO_CONTENT)
    public void move(@PathVariable Long id, @RequestBody MoveOptions options) {
        cardService.move(id, options);
    }

    @GetMapping("{id}")
    @ResponseBody
    public Card get(@PathVariable Long id) {
        return cardService.findById(id).orElse(null);
    }

    @PutMapping("{id}/title")
    @ResponseStatus(NO_CONTENT)
    public void updateTitle(@PathVariable Long id, @RequestBody String title) {
        cardService.updateTitle(id, title);
    }

}
