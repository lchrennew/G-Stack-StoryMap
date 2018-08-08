package chun.li.GStack.StoryMap.api;

import com.fasterxml.jackson.annotation.JsonProperty;

public class MoveOptions {
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public MoveDirection getDirection() {
        return direction;
    }

    public Long getRelease() {
        return release;
    }

    public boolean hasRelease() {
        return release != null;
    }

    public enum MoveDirection {
        Next, Detail, Root, Plan
    }

    @JsonProperty
    private Long id;

    @JsonProperty
    private MoveDirection direction;

    @JsonProperty
    private Long release;

    public static MoveOptions plan(Long id, Long release){
        MoveOptions options= new MoveOptions();
        options.id = id;
        options.release = release;
        options.direction = MoveDirection.Plan;
        return options;
    }
}
