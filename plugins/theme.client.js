export default defineNuxtPlugin(() => {
    const darkTheme = `--main-bg-color: #101418; --main-text-color: #e0e2e8; --sub-text-color: #C5C8BA; --sub-text-color-hover: #000000; --main-color: #1d2024; --main-color-alpha: rgba(29, 32, 36, 0.8) ; --sub-color-alpha: rgba(29, 32, 36, 0.8); --sub-color: #272b30; --main-outline-color: #42474e; --main-border-color: #42474e; --highlight-color: #53ff78; --highlight-color-alpha: #2d3d34; --highlight-color-sub: #7a7a7a; --invert: 0;`
    if (process.client) {
        if (!localStorage.getItem("userTheme") || localStorage.getItem("userTheme") === "null") {
            localStorage.setItem("userTheme", darkTheme)
        }
        document.querySelector("html").style.cssText = localStorage.getItem("userTheme")
    }
})