const button = document.querySelector("button")

button.addEventListener("click", () => {
    Notification.requestPermission().then(perm => {
        if(perm === "granted"){
            const notification = new Notification("Example Notification", {
                body: "This is a push notification",
                data: { hello: "world" },
                icon: "",
                // tag is useful for overwriting current notification so a new notif is not created every click and they don't stack on top of each other
                tag: "Welcome message",
            })

            notification.addEventListener("error", e => {
                alert("error")
            })
        }
    })
})

// push notification if you are on another page/tab
let notification2
let interval
document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden"){
        const leaveDate = new Date()
        interval = setInterval(() => {
            notification2 = new Notification("Come back please!", {
                body: `You have been gone for ${Math.round((new Date() - leaveDate) / 1000)} seconds.`,
                tag: " Come back!",
            })
        }, 100);
    } else {
        // close notification when going back to page/tab
        if (interval) clearInterval(interval)
        if (notification2) notification2.close()
    }
})
