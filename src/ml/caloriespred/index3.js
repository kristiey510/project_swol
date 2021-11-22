
// bias, gender, age, height, info['weight'], duration, heart_rate
import {create, all, config} from 'mathjs';
const math = create(all, config);
import {
    collection,
    db,
    auth,
    getDoc,
    doc
} from "../../firebase/firebase.js";
(async () => {

    let example = "Y5sAEElg7cUOAdrswinf8Swrs443";

    // const userinfo = query(info, where("User_id", "==", example));
    let input = {};

    const docSnap = await getDoc(doc(db, "Profile", example));
    if (docSnap.exists()) {
        //console.log("Document data:", docSnap.data());
        const data = docSnap.data();
        console.log("Data:", data)

        //[0,1,21,172,64,60,100,200];
        // gender, age, height, weight, duration, heart_rate
        let require = ['gender', 'age', 'height', 'weight', 'duration', 'heart_rate']
        if (data["Gender"].toLowerCase() == 'male'){
            input["gender"] = 1;
        }
        else{
            input["gender"] = 0;
        }

        let dob = data['Dob'];
        let age = cal_age(dob);
        input['age'] = age;

        let h_ft = data["Height_Ft"];
        input['feet'] = h_ft;
        let h_in = data["Height_In"];
        input['inch'] = h_in;
        let height = parseInt( 30.48 * parseInt(h_ft) + 2.54 * parseInt(h_in));
        input['height'] = height;

        let pounds = data['Weight'];
        input['pounds'] = pounds;
        let weight = parseInt(pounds) * 0.4536;
        input['weight'] = weight;

    } else {
        console.log("No such document!");
    }
    let activity = {}
    const docSnap2 = await getDoc(doc(db, "Exercise", example));
    if (docSnap2.exists()) {
        //console.log("Document data:", docSnap.data());
        const data2 = docSnap2.data();
        activity['duration'] = data2['Duration'];
        activity['heart_rate'] = data2['Heart_rate'];
        activity['reps'] = data2['Reps'];
        activity['min'] = data2['Min']
    }else {
        console.log("No such document!");
    }
//
    let info = []
    for (let key in input){
        if (key in require) {
            info.push(input[key]);
        }
    }
    for (let key in activity){
        if (key == 'duration' | key == 'heart_rate' ){
            info.push(input[key]);
        }
    }
    // logistic prediction uses info array

let testVector1 = [1,40,180,64,60,100,200];
let coef = [ -0.000720227952313 , -0.00033022261894791085 , -0.00116291667261878,
    0.025922387078901987 , -0.007142846658622096 , 0.0041021005690845755 , 0.026589314877995082 , -0.0392155038148618 ]
console.log(predict(coef,testVector1));
})();

function sigmoid(z) {
    let g = math.evaluate(`1 ./ (1 + e.^-z)`, {
        z,
    });

    return g;
}

function predict(theta, x) {
    x.unshift(1);
    let p = sigmoid(math.evaluate(`x * theta`, {
        x,
        theta,
    }));

    return suggest(p);
}

export function cal_age(sample){
    let ts = Date.now();
    let today = new Date(ts);

    let month = parseInt(sample.substring(0,2));
    let day = parseInt(sample.substring(3,5));
    let year = parseInt(sample.substring(6));

    let age = today.getFullYear()- year;
    let m = today.getMonth() - month;

    if (m < 0 || (m === 0 && today.getDate() < day))
    {
        age--;
    }

    return age;
}

export function suggest(p){
    let sentence = ''
    if (p < 0.25){
        sentence = "you need to change your exercise custom completely";
    }
    else if (0.25 <= p < 0.75){
        sentence = "not bad. change a bit of your exercise habits can be better"
    }
    else{
        sentence = "good work! keep it on"
    }
    return p;
}
//sportT: sport type
function linear_prediction(sportT, info, activity){
    let exercise = sportT.toLowerCase();
    let dict = {};
    dict['running'] = (info['pounds']*0.453592) * ((1.52*60*(activity['mile'])/(info['inch']))+0.113) * 0.0175 * activity['min'];
    dict['biking']= (7/8) * (info['pounds']*0.453592) * (1.52*60* activity['mile']/(info['inch'])+0.113) * 0.0175 * activity['min'];
    dict['elliptical'] = (5/8) * (info['pounds']*0.453592) * (1.52*60* activity['mile']/activity['min']) * 0.0175 * activity['min'];
    dict['stair_Climber'] =  (9/8) * (info['pounds']*0.453592) * (1.52*60* activity['mile']/activity['min']+0.113) * 0.0175 * (activity['inch']);
    dict ['plank'] = info['pounds'] * 0.026 * activity['min'];

    // pull up or chinfo['inch'] ups
    dict ['pull_up'] = (info['pounds']*0.453592) * 9.8 * (5/12*(info['feet']*0.3048+info['inch']*0.0254)) * 0.000239006 * activity['reps'];
    //crunch
    dict ['sit up'] = (0.64*info['pounds']*0.453592) * 9.8 * (5/32*(info['feet']*0.3048+info['inch']*0.0254)) * 0.000239006 * activity['reps'];
    dict ['crunch'] = (0.64*info['pounds']*0.453592) * 9.8 * (5/32*(info['feet']*0.3048+info['inch']*0.0254)) * 0.000239006 * activity['reps'];
    dict ['push up'] = (0.64*info['pounds']*0.453592) * 9.8 * (5/12*(info['feet']*0.3048+info['inch']*0.0254)) * 0.000239006 * activity['reps'];
    dict ['chin up'] = (0.64*info['pounds']*0.453592) * 9.8 * (5/12*(info['feet']*0.3048+info['inch']*0.0254)) * 0.000239006 * activity['reps'];
    dict ['bench'] = (activity['lbs']*0.453592) * 9.8 * (5/12*(info['feet']*0.3048+info['inch']*0.0254)) * 0.000239006 * activity['reps'];
    dict ['squat'] =((activity['lbs']+info['pounds'])*0.453592) * 9.8 * (1/4*(info['feet']*0.3048+info['inch']*0.0254)) * 0.000239006 * activity['reps'];
    dict ['deadlift'] = ((activity['lbs']+info['pounds'])*0.453592) * 9.8 * (7/16*(info['feet']*0.3048+info['inch']*0.0254)) * 0.000239006 * activity['reps'];
    dict ['shoulder press'] = (activity['lbs']*0.453592) * 9.8 * (5/12*(info['feet']*0.3048+info['inch']*0.0254)) * 0.000239006 * activity['reps'];
    dict ['shoulder raises'] = (activity['lbs']*0.453592) * 9.8 * (5/12*(info['feet']*0.3048+info['inch']*0.0254)) * 0.000239006 * activity['reps'];
    dict ['rows'] = (activity['lbs']*0.453592) * 9.8 * (5/12*(info['feet']*0.3048+info['inch']*0.0254)) * 0.000239006 * activity['reps'];
    dict ['lunges'] = ((activity['lbs']+info['pounds'])*0.453592) * 9.8 * (7/16*(info['feet']*0.3048+info['inch']*0.0254)) * 0.000239006 * activity['reps'];
    dict ['shrugs'] = (activity['lbs']*0.453592) * 9.8 * (1/16*(info['feet']*0.3048+info['inch']*0.0254)) * 0.000239006 * activity['reps'];
    dict ['hang_clean'] = (activity['lbs']*0.453592) * 9.8 * (3/8*(info['feet']*0.3048+info['inch']*0.0254)) * 0.000239006 * activity['reps'];
    dict ['clean_jerk'] = (activity['lbs']*0.453592) * 9.8 * (19/24*(info['feet']*0.3048+info['inch']*0.0254)) * 0.000239006 * activity['reps'];
    dict ['snatch'] = (activity['lbs']*0.453592) * 9.8 * (((5*math.sqrt(2)/24)+3/8)*(info['feet']*0.3048+info['inch']*0.0254)) * 0.000239006 * activity['reps'];


    return dict[exercise,info];
}