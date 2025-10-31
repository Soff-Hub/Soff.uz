export async function sleep(ms = 1000) {
    let timing;
    return new Promise((resolve) => {
        timing = setTimeout(() => {
            clearTimeout(timing);
            resolve();
        }, ms);
    });
}
