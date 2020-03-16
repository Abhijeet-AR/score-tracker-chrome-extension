console.log('background Running');

let reset_time = new Date().setHours(23, 59);

let user_info = {
    'codechef': 'abhijeet_ar',
    'codeforces': 'abhijeet_ar',
    'spoj': 'abhijeet_ar',
    'interviewbit': 'abhijeet_ar'
}

function get_url(platform){
    return 'http://competitive-coding-api.herokuapp.com/api/'+platform+'/'+user_info[platform];
}

function reset_data() {
    const codeforces_url = get_url('codeforces');

    fetch(codeforces_url)
    .then(response => response.json())
    .then(data => {
        if (data.status == 'Success'){
            chrome.storage.sync.get(['date', 'codeforces'], (stored_data) => {
                try{
                    let d = new Date();
                    let date_today = {
                        'date': d.getDate(),
                        'month': d.getMonth(),
                        'year': d.getYear()
                    }

                    // console.log('Stored Data', stored_data, date_today);
                    if((stored_data.codeforces == undefined) || JSON.stringify(stored_data.date) != JSON.stringify(date_today)){
                        chrome.storage.sync.set({'date': date_today, 'codeforces': data}, function(){
                            console.log('Codeforces Data Set');
                        });
                    }

                    else
                        console.log('Codeforces Data Already set');
                }

                catch(err){
                    console.log('Codeforces Error', err);
                }
            });
        }

        else
            console.log('Codeforces Error');
    })

    const codechef_url = get_url('codechef');

    fetch(codechef_url)
    .then(response => response.json())
    .then(data => {
        if (data.status == 'Success'){
            chrome.storage.sync.get(['date', 'codechef'], (stored_data) => {
                try{
                    let d = new Date();
                    let date_today = {
                        'date': d.getDate(),
                        'month': d.getMonth(),
                        'year': d.getYear()
                    }

                    // console.log('Stored Data', stored_data.codechef);
                    if((stored_data.codechef == undefined) || (JSON.stringify(stored_data.date) != JSON.stringify(date_today))){
                        chrome.storage.sync.set({'date': date_today, 'codechef': data}, function(){
                            console.log('Codechef Data Set');
                        });
                    }

                    else
                        console.log('Codechef Data Already set');
                }

                catch(err){
                    console.log('Codechef Error', err);
                }
            });
        }

        else
            console.log('Codechef Error');
    })

    const spoj_url = get_url('spoj');

    fetch(spoj_url)
    .then(response => response.json())
    .then(data => {
        if (data.status == 'Success'){
            chrome.storage.sync.get(['date', 'spoj'], (stored_data) => {
                try{
                    let d = new Date();
                    let date_today = {
                        'date': d.getDate(),
                        'month': d.getMonth(),
                        'year': d.getYear()
                    }

                    // console.log('Stored Data', stored_data);
                    if((stored_data.spoj == undefined) || (JSON.stringify(stored_data.date) != JSON.stringify(date_today))){
                        chrome.storage.sync.set({'date': date_today, 'spoj': data}, function(){
                            console.log('SPOJ Data Set');
                        });
                    }

                    else
                        console.log('SPOJ Data Already set');
                }

                catch(err){
                    console.log('SPOJ Error', err);
                }
            });
        }

        else
            console.log('SPOJ Error');
    })

    const interviewbit_url = get_url('interviewbit');

    fetch(interviewbit_url)
    .then(response => response.json())
    .then(data => {
        if (data.status == 'Success'){
            chrome.storage.sync.get(['date', 'interviewbit'], (stored_data) => {
                try{
                    let d = new Date();
                    let date_today = {
                        'date': d.getDate(),
                        'month': d.getMonth(),
                        'year': d.getYear()
                    }

                    // console.log('Stored Data', stored_data);
                    if((stored_data.interviewbit == undefined) || (JSON.stringify(stored_data.date) != JSON.stringify(date_today))){
                        chrome.storage.sync.set({'date': date_today, 'interviewbit': data}, function(){
                            console.log('Interviewbit Data Set');
                        });
                    }

                    else
                        console.log('Interviewbit Data Already set');
                }

                catch(err){
                    console.log('Interviewbit Error', err);
                }
            });
        }

        else
            console.log('Interviewbit Error');
    })
}

chrome.runtime.onInstalled.addListener((details) => {
    console.log(details.reason, 'successful');
    chrome.alarms.get('Reset', (alarm) => {
        if(alarm)
            console.log('Alarm already exists', alarm);

        else{
            chrome.alarms.create('Reset', {when: reset_time});
            console.log('Alarm created at ', new Date().getHours(), ':', new Date().getMinutes());
        }
    })
})

chrome.runtime.onStartup.addListener(() => {
    chrome.alarms.get('Reset', (alarm) => {
        if(alarm)
            console.log('Alarm already exists', alarm);

        else{
            chrome.alarms.create('Reset', {when: reset_time});
            console.log('Alarm created at ', new Date().getHours(), ':', new Date().getMinutes());
        }
    })
});

chrome.alarms.onAlarm.addListener(() => {
    console.log("Resetting Data at ", new Date().getHours(), ':', new Date().getMinutes());
    reset_data();
});