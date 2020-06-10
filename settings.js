saveUsernames = () => {
  const codeforces_username = document.getElementById("codeforces").value;
  const codechef_username = document.getElementById("codechef").value;
  const spoj_username = document.getElementById("spoj").value;
  const interviewbit_username = document.getElementById("interviewbit").value;

  chrome.storage.sync.get("usernames", (stored_data) => {
    let new_usernames = { ...stored_data.usernames };
    if (codeforces_username) new_usernames["codeforces"] = codeforces_username;
    if (codechef_username) new_usernames["codechef"] = codechef_username;
    if (spoj_username) new_usernames["spoj"] = spoj_username;
    if (interviewbit_username)
      new_usernames["interviewbit"] = interviewbit_username;

    chrome.storage.sync.set({ usernames: new_usernames }, () => {
      console.log("New: ", new_usernames);
    });
  });
};

window.onload = () => {
  document.getElementById("save-btn").addEventListener("click", saveUsernames);
};
