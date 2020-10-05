/*
 * @lc app=leetcode.cn id=804 lang=cpp
 *
 * [804] 唯一摩尔斯密码词
 */

// @lc code=start
#include <iostream>
#include <vector>
using namespace std;

class Solution {
   public:
    int uniqueMorseRepresentations(vector<string>& words) {
        //返回我们可以获得所有词不同单词翻译的数量。
        //遍历字符串数组，将合成的字符串与之前的作比较并决定是否保存
        string tem[26] = {".-",   "-...", "-.-.", "-..",  ".",    "..-.", "--.",
                          "....", "..",   ".---", "-.-",  ".-..", "--",   "-.",
                          "---",  ".--.", "--.-", ".-.",  "...",  "-",    "..-",
                          "...-", ".--",  "-..-", "-.--", "--.."};
        string ans[words.size()] = {0};
        new* string = for (int i = 0; i < words.size(); i++) {
            for (int j = 0; j < words.at(i).length(); j++) {
                int a = words.at(i).at(j) - 'a';
                ans[i] += tem[a];
            }
        }  //无脑遍历先将所有结果放入ans数组中避免单个循环过于复杂
        for (int i = 0; i < words.size(); i++) {
            /* code */
        }
    }
};
// @lc code=end
