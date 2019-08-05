<script>
	import Header from './components/Header.svelte'
	import Main from './components/Main.svelte'
	import Footer from './components/Footer.svelte'
	const grid = new Array().fill()
</script>

<style>
	:global(body) {

		padding: 0;
		box-sizing: border-box;
	}
	#main-container {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		height: 100vh;
		width: 100vh;
	}
</style>

<div id="main-container">
	<Header />
	<Main />
	<Footer />
</div>
