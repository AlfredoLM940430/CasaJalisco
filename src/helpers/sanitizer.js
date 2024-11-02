export const sanitizer = (input) => {

    const tagsRegex = /<\/?([a-z][a-z0-9]*)\b[^>]*>/gi;
    const attributesRegex = /([a-z][a-z0-9]*)="[^"]*"/gi;
    const protocols = ["http", "https", "mailto", "tel"];
    const hrefRegex = /href="(.*?)"/gi;
    const srcRegex = /src="(.*?)"/gi;

    // Remove HTML tags and attributes from the input, except for allowed protocols in href and src attributes
    const sanitizedInput = input.replace(tagsRegex, "").replace(attributesRegex, (match, attribute) => {
        if (attribute === "href" || attribute === "src") {
            return match.replace(/"/g, "'").replace(hrefRegex, (match, url) => {
                const protocol = url.split(":")[0];
                if (protocols.includes(protocol)) {
                    return `href="${url}"`;
                } else {
                    return "";
                }
            }).replace(srcRegex, (match, url) => {
                const protocol = url.split(":")[0];
                if (protocols.includes(protocol)) {
                    return `src="${url}"`;
                } else {
                    return "";
                }
            });
        } else {
            return `${attribute}="${match.slice(attribute.length + 2, -1)}"`;
        }
    });

    return sanitizedInput;
    
}

export default sanitizer;