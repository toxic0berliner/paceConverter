import {trigger,state,style,transition,animate,group,query,stagger,keyframes} from "@angular/animations";

export const SlideInOutAnimation = [
  trigger("slideInOut", [
    state(
      "in",
      style({
        "max-height": "10rem",
        opacity: "1",
        visibility: "visible"
      })
    ),
    state(
      "out",
      style({
        "max-height": "0px",
        opacity: "0",
        visibility: "hidden"
      })
    ),
    transition("in => out", [
      group([
        animate(
          "200ms ease-in-out",
          style({
            "max-height": "0px"
          })
        ),
        animate(
          "150ms ease-in-out",
          style({
            visibility: "hidden"
          })
        )
      ])
    ]),
    transition("out => in", [
      group([
        animate(
          "1ms ease-in-out",
          style({
            visibility: "visible"
          })
        ),
        animate(
          "200ms ease-in-out",
          style({
            "max-height": "10rem"
          })
        )
      ])
    ])
  ])
];
