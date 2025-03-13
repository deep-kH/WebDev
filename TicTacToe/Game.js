const boxes = document.querySelectorAll(".box");

const result = document.querySelector('.result h3');

count = 0;
var x = [];
var o = [];
var win = [['one', 'two', 'three'], ['one', 'four', 'seven'],
['one', 'five', 'nine'], ['two', 'five', 'eight'],
['three', 'six', 'nine'], ['three', 'five', 'seven'],
['four', 'five', 'six'], ['seven', 'eight', 'nine']];

boxes.forEach(item => {
    item.addEventListener('click', () => {
        count++
        if (count % 2 === 0) {
            item.children[1].classList.remove("oo");
            item.children[0].remove();
            o.push(item.classList[1]);
            win.forEach(item => {

                var check = 0;

                item.forEach(item => {

                    if (o.includes(item)) {
                        check++;
                        if (check >= 3) {
                            result.textContent = "Player 2 WON";
                            setTimeout(function () {
                                window.location.reload();
                            }, 2000);
                        }
                    }
                })
            });
        }
        else if (count % 2 === 1) {
            item.children[0].classList.remove("xx");
            item.children[1].remove();
            x.push(item.classList[1]);
            win.forEach(item => {

                var check = 0;

                item.forEach(item => {

                    if (x.includes(item)) {
                        check++;
                        if (check >= 3) {
                            result.textContent = "Player 1 WON";
                            setTimeout(function () {
                                window.location.reload();
                            }, 3000);
                        }
                    }
                })
            });

        }
        if (count == 9) {
            setTimeout(function () {
                count++
                console.log(count);
                result.textContent = "TIE";
                setTimeout(function () {
                    window.location.reload();
                }, 2000);
            }, 3001);
        }

    }, { once: true })

});









