console.log("Opened!");
let user_info = {};

chrome.storage.sync.get("usernames", (stored_data) => {
  user_info = stored_data.usernames;

  console.log(user_info);
  fill_scores();
});

// const proxyurl = "https://cors-anywhere.herokuapp.com/";

function get_url(platform) {
  return (
    "http://competitive-coding-api.herokuapp.com/api/" +
    platform +
    "/" +
    user_info[platform]
  );
}

async function fill_scores() {
  const codeforces_url = get_url("codeforces");
  fetch(codeforces_url)
    .then((response) => response.json())
    .then((data) => {
      if (data.status == "Success") {
        chrome.storage.sync.get("codeforces", function (stored_data) {
          try {
            document.getElementById("codeforces").textContent =
              data.rating - stored_data.codechef.rating;
          } catch (err) {
            chrome.storage.sync.set({ codeforces: data }, function () {
              document.getElementById("codeforces").textContent = 0;
            });
          }
        });
      } else {
        console.log(data.details);
        document.getElementById("codeforces").textContent = "error";
      }
    })
    .catch(() => console.log("Codeforces Error!"));

  const codechef_url = get_url("codechef");
  fetch(codechef_url)
    .then((response) => response.json())
    .then((data) => {
      if (data.status == "Success") {
        chrome.storage.sync.get("codechef", function (stored_data) {
          // console.log(data);
          try {
            document.getElementById("codechef").textContent =
              data.rank - stored_data.codechef.rank;
          } catch (err) {
            chrome.storage.sync.set(
              {
                codechef: {
                  status: data.status,
                  rank: data.rank,
                  rating: data.rating,
                  global_rank: data.global_rank,
                  contests: data.contests,
                },
              },
              function () {
                document.getElementById("codechef").textContent = 0;
              }
            );
          }
        });
      } else {
        console.log(data.details);
        document.getElementById("codechef").textContent = "error";
      }
    })
    .catch(() => console.log("Codechef Error!"));

  const spoj_url = get_url("spoj");
  fetch(spoj_url)
    .then((response) => response.json())
    .then((data) => {
      if (data.status == "Success") {
        chrome.storage.sync.get("spoj", function (stored_data) {
          // console.log(data);
          try {
            document.getElementById("spoj").textContent =
              data.points - stored_data.spoj.points;
          } catch (err) {
            chrome.storage.sync.set({ spoj: data }, function () {
              document.getElementById("spoj").textContent = 0;
            });
          }
        });
      } else {
        console.log(data.details);
        document.getElementById("spoj").textContent = "error";
      }
    })
    .catch(() => console.log("SPOJ Error!"));

  const interviewbit_url = get_url("interviewbit");
  fetch(interviewbit_url)
    .then((response) => response.json())
    .then((data) => {
      if (data.status == "Success") {
        chrome.storage.sync.get("interviewbit", function (stored_data) {
          // console.log(data);
          try {
            document.getElementById("interviewbit").textContent =
              data.score - stored_data.interviewbit.score;
          } catch (err) {
            chrome.storage.sync.set({ interviewbit: data }, function () {
              document.getElementById("interviewbit").textContent = 0;
            });
          }
        });
      } else {
        console.log(data.details);
        document.getElementById("interviewbit").textContent = "error";
      }
    })
    .catch(() => {
      console.log("Interviewbit Error");
      document.getElementById("interviewbit").textContent = "error";
    });
}

// window.onload = function() {
//     document.querySelector('#settings').addEventListener('click', () => {
//         chrome.runtime.openOptionsPage();
//     });
// }

window.onload = function () {
  document.getElementById("settings").onmouseenter = function () {
    document.getElementById("settings").style.animation =
      "spin-quarter-clock 0.1s linear forwards";
    console.log("triggered");
  };

  document.getElementById("settings").onmouseleave = function () {
    document.getElementById("settings").style.animation =
      "spin-quarter-anti-clock 0.1s linear";
    console.log("Leave triggered");
  };
};

// $("#settings").mouseleave(function(){
//     $("#settings").style.transform = "rotate(45deg)";
// });
