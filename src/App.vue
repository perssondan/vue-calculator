<template>
    <b-container>
        <b-nav align="center" class="p-2 mb-5">
            <b-nav-item active>
                <router-link to="/">
                    <span>Standard</span>
                </router-link>
            </b-nav-item>
            <span class="divider"></span>
            <b-nav-item>
                <router-link to="/about">
                    <span>About</span>
                </router-link>
            </b-nav-item>
            <router-view />
        </b-nav>
    </b-container>
</template>

<style lang="css">
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    background: #222;
}

.container {
    width: 100%;
    height: 100vh;
}

button:hover {
    opacity: 0.8;
}
.divider {
    margin: 10px 0;
    width: 1px;
    cursor: default;
    background-color: white;
    cursor: default;
}
.nav-link a {
    color: gray;
    text-decoration: none;
    cursor: pointer;
}
.nav-link a:hover,
.nav-link a:focus,
.nav-link a:active {
    color: white;
    text-decoration: none;
    opacity: 0.6;
    border-bottom: 1px solid white;
}
</style>
