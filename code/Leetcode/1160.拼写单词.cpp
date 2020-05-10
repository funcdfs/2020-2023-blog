/*
 * @lc app=leetcode.cn id=1160 lang=cpp
 *
 * [1160] 拼写单词
 */

// @lc code=start
#include <iostream>
#include <vector>
using namespace std;

class Solution {
   public:
    int countCharacters(vector<string>& words, string chars) {
        //统计 chars 中的字符个数，统计每一个 words 的个数
        int chars_total[26] = {0};
        int words_total[26] = {0};

        int result = 0;
        //统计字母表的每一个个数  小写字母 a 为 97
        for (int i = 0; i < chars.length(); i++) {
            chars_total[chars.at(i) - 97]++;
        }
        //统计每一个字符串的字符出现个数
        for (int i = 0; i < words.size(); i++) {
            for (int j = 0; j < words.at(0).size(); i++) {
                words_total[words.at(i).at(j) - 97]++;
            }
            //当一个单词的每个字母统计数量完成后与模板表进行比对，若为子集就累加到长度中
                }
        //
        return result;
    }
};
// @lc code=end
