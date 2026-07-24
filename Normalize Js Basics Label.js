function normalizeJsBasicsLabel(label) {
    let result = label
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, ""); 

    if (result === "") {
        return "js-basic";
    }

    return "js-basic-" + result;
}