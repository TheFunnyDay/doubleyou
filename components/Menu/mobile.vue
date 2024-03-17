
<template>
    <div id="mobileMenu">
        <NuxtLink to="/about" class="mobileNav"><img src="/icons/info.png" alt=""></NuxtLink>
        <NuxtLink to="/premium" class="mobileNav"><img src="/doubleyou-logo-white.png" alt="" style="transition-delay: .1s;"></NuxtLink>
        <NuxtLink to="/" class="mobileNav"><img src="/icons/home.png" alt="" style="transition-delay: .2s;"></NuxtLink>
        <NuxtLink to="/userlists" class="mobileNav"><img src="/icons/people.png" alt="" style="transition-delay: .4s;"></NuxtLink>
        <NuxtLink to="/settings" class="mobileNav"><img src="/icons/settings.png" alt="" style="transition-delay: .5s;"></NuxtLink>
    </div>
</template>

<style lang="scss">
#mobileMenu {
    display: flex;
    position: fixed;
    z-index: 991;
    width: 100%;
    height: 70px;
    background-color: red;
    bottom: -75px;
    background-color: var(--sub-color-alpha);
    backdrop-filter: none;
    outline: 1px solid var(--main-outline-color);
    transition: bottom .5s;
    align-items: center;
    flex-wrap: nowrap;
    justify-content: space-around;
    @media (max-width: 633px) {
        backdrop-filter: blur(25px);
        bottom: -1px;
    }
    .mobileNav {
        img {
            position: relative;
            bottom: -60px;
            padding: 3px;
            width: 30px;
            filter: invert(var(--invert));
            transition: bottom .5s;
            // transition-delay: bottom .6s;
            @media (max-width: 633px) {
                bottom: 0;
            }
        }
    }
}
</style>