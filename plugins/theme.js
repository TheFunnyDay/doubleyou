export default defineNuxtPlugin(() => {
    const amoledTheme = `--main-bg-color: #000000; --main-text-color: #ffffff; --sub-text-color: #ABABAB; --sub-text-color-hover: #000000; --main-color: #000000; --main-color-alpha: rgba(29, 29, 29, 0.8); --sub-color-alpha: rgba(0, 0, 0, 0.8); --sub-color: #0f0f0f; --main-outline-color: #2f3633; --main-border-color: #3f3f3f; --highlight-color: #00dc82; --highlight-color-alpha: #1a2923; --highlight-color-sub: #7a7a7a; --invert: 0;`;
    if (process.client) {
        if (!localStorage.getItem("userTheme")) {
            localStorage.setItem("userTheme", amoledTheme)
        }
        document.querySelector("html").style.cssText = localStorage.getItem("userTheme")
    }
})