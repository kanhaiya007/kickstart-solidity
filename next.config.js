const path = require("path");

module.exports = {
    sassOptions: {
        includePaths: [path.join(__dirname, "styles")],
        prependData: `@import "variable.scss";`,
    },
    images: {
        domains: ["images.unsplash.com"],
    },
};
