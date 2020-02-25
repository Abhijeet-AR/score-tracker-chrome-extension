console.log('Opened!')
let user_info = {
    'codechef': 'abhijeet_ar',
    'codeforces': 'abhijeet_ar',
    'spoj': 'abhijeet_ar',
    'interviewbit': 'abhijeet_ar'
}

const proxyurl = "https://cors-anywhere.herokuapp.com/";

async function get_userdata(api_url){
    return fetch(proxyurl+api_url)
    .then(response => response.json())
    // .then(data => data)
    .catch(() => console.log('Error!'));
}

function get_url(platform){
    return 'http://competitive-coding-api.herokuapp.com/api/'+platform+'/'+user_info[platform];
}

async function fill_scores(){
 
    const codeforces_url = get_url('codeforces');
    let codeforces_data = await get_userdata(codeforces_url);
    document.getElementById('codeforces').textContent = codeforces_data.rating;

    const codechef_url = get_url('codechef');
    let codechef_data = await get_userdata(codechef_url);
    document.getElementById('codechef').textContent = codechef_data.rank;

    const spoj_url = get_url('spoj');
    let spoj_data = await get_userdata(spoj_url);
    document.getElementById('spoj').textContent = spoj_data.points;

    const interviewbit_url = get_url('interviewbit');
    let interviewbit_data = await get_userdata(interviewbit_url);
    document.getElementById('interviewbit').textContent = interviewbit_data.score;
}

fill_scores()