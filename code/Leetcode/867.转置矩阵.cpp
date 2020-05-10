/*
 * @lc app=leetcode.cn id=867 lang=cpp
 *
 * [867] 转置矩阵
 */

// @lc code=start
#include <iostream>
#include <vector>
using namespace std;

class Solution {
   public:
    // 123  147
    // 456  258
    // 789  369
    vector<vector<int>> transpose(vector<vector<int>>& A) {
        // hanhan题目，初始化一下：
        vector<vector<int>> result(A.size(), vector<int>(A.at(0).size(), 0));
        // 遍历一次进行赋值
        for (int i = 0; i < A.size(); i++) {
            for (int j = 0; j < A.at(0).size(); j++) {
                /* code */
            }
        }

        return result;
    }
};
// @lc code=end
