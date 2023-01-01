"use strict";
/// <reference types="." />
class Main {
    constructor() {
        this._paths = document.querySelectorAll("svg path");
        this._drawAlongPaths();
    }
    _drawAlongPaths() {
        this._paths.forEach((path, index) => {
            const pathLength = path.getTotalLength();
            path.setAttribute("stroke-dasharray", pathLength.toString());
            path.setAttribute("stroke-dashoffset", pathLength.toString() + 1);
            path.innerHTML = this._createAnimationTag(pathLength, index);
            console.log("path info", index, pathLength, path.innerHTML);
        });
    }
    static _createBeginTime(index) {
        if (index === 0) {
            return "0s";
        }
        else {
            return `a${index - 1}.end`;
        }
    }
    _createAnimationTag(pathLength, index) {
        //some relative number to calculate how fast a path will draw itself based on how long the path is
        const speed = 100;
        //dynamically create the animation tag based on the order that the paths are found in the path node list
        // first one is assigned id 0 as first index..next tag is assigned id of next index
        //animation of next path starts when the previous animation tag ends
        return `
            <animate
                id=a${index}
                attributeName='stroke-dashoffset'
                begin='${Main._createBeginTime(index)}'
                dur='${pathLength / speed}s'
                from='${pathLength}'
                to='0'
                fill='freeze'
            />
        `;
    }
}
