
// Returns a random integer in range [min, max)
function randInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

// Given a string formatted as "2d6 1d20 ..."
// Returns a list of integers [6, 6, 20, ...]
function parseInputString(inputString) {
    var diceStrings = str.toLowerCase().match(/\S+/g) || [];
    var diceNumbers = [];
    diceStrings.forEach(function(diceString) {
        var diceStringSplit = diceString.split('d');
        var count = diceStringSplit(diceStringSplit[0]);
        var value = diceStringSplit(diceStringSplit[1]);
        
    });
}

class Dice {

    static roll(inputString) {

    }

}

export default Dice;

/*
package com.Rishiswaz.util;

import java.util.Vector;

import static java.lang.Math.random;
//import java.io.*;

public class Dice {
    public static Vector<Integer> roll(String input){
        Vector<Integer> retVal = new Vector<>();
        int[] parsed =parseDice(input);
        int roll=1; //count =0;
        for (int i = 0; i<parsed[0];i++){
            while(roll <=1 || roll>=parsed[1]){
                roll = (int) (random() * parsed[1]);
                //count++;
                //System.out.println(count);
            }
            retVal.add(roll);
            roll = 0;
        }
        return retVal;
    }

    public static int roll(){
        int roll=0;
        while(roll <=0 || roll>=20){
            roll = (int) random()*20;
        }
        return roll;
        }

    private static int[] parseDice(String input){
        int[] parsed = new int[]{0,0};
        parsed[0] = Integer.parseInt(input.split("d")[0]);
        parsed[1] = Integer.parseInt(input.split("d")[1]);
        return parsed;
    }
}
*/