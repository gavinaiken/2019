function run(which) {
    console.time('execution time')

    if (which.length === 1) {
        which = `0${which}`
    }

    require(`./src/${which}`)
        .run()
        .then(() => console.timeEnd('execution time'))
        .catch(console.error)
}

module.exports = { run }
