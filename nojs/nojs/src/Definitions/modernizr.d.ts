﻿// Type definitions for Modernizr 2.6.2
// Project: http://modernizr.com/
// Definitions by: Boris Yankov <https://github.com/borisyankov/>
// Definitions: https://github.com/borisyankov/DefinitelyTyped


interface AudioBool {
    ogg: boolean;
    mp3: boolean;
    wav: boolean;
    m4a: boolean;
}

interface VideoBool {
    ogg: boolean;
    h264: boolean;
    webm: boolean;
}

interface InputBool {
    autocomplete: boolean;
    autofocus: boolean;
    list: boolean;
    placeholder: boolean;
    max: boolean;
    min: boolean;
    multiple: boolean;
    pattern: boolean;
    required: boolean;
    step: boolean;
}

interface InputTypesBool {
    search: boolean;
    tel: boolean;
    url: boolean;
    email: boolean;
    datetime: boolean;
    date: boolean;
    month: boolean;
    week: boolean;
    time: boolean;
    datetimelocal: boolean;
    number: boolean;
    range: boolean;
    color: boolean;
}

interface ModernizrStatic {
    fontface: boolean;
    backgroundsize: boolean;
    borderimage: boolean;
    borderradius: boolean;
    boxshadow: boolean;
    flexbox: boolean;
    hsla: boolean;
    multiplebgs: boolean;
    opacity: boolean;
    rgba: boolean;
    textshadow: boolean;
    cssanimations: boolean;
    csscolumns: boolean;
    generatedcontent: boolean;
    cssgradients: boolean;
    cssreflections: boolean;
    csstransforms: boolean;
    csstransforms3d: boolean;
    csstransitions: boolean;
    applicationcache: boolean;
    canvas: boolean;
    canvastext: boolean;
    draganddrop: boolean;
    hashchange: boolean;
    history: boolean;
    audio: AudioBool;
    video: VideoBool;
    indexeddb: boolean;
    input: InputBool;
    inputtypes: InputTypesBool;
    localstorage: boolean;
    postmessage: boolean;
    sessionstorage: boolean;
    websockets: boolean;
    websqldatabase: boolean;
    webworkers: boolean;
    geolocation: boolean;
    inlinesvg: boolean;
    smil: boolean;
    svg: boolean;
    svgclippaths: boolean;
    touch: boolean;
    webgl: boolean;

    load(resources: Array);
    load(resourceObject: any);
    load(resourceString: string);

    prefixed(): boolean;
    prefixed(property: string): boolean;
    prefixed(property: string, obj: any, element?: any): boolean;

    mq(mediaQuery: string): boolean;

    addTest(feature: string, test: () => any);
    addTest(feature: string, test: boolean);
    addTest(feature: any);

    testStyles(rule: string, callback: (element, rule) => boolean, nodes?: number, testnames?: string[]): boolean;
    testProp(property: string): boolean;
    testAllProps(property: string, prefix?: string): boolean;
    testAllProps(property: string, obj: any, element: any): boolean;

    hasEvent(eventName: string, element?: any): boolean;
}

declare var Modernizr: ModernizrStatic;
