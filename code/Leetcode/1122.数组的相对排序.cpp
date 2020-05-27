/*
 * @lc app=leetcode.cn id=1122 lang=cpp
 *
 * [1122] 数组的相对排序
 */

// @lc code=start

#include <algorithm>
#include <iostream>
#include <vector>
using namespace std;

class Solution {
   public:
    vector<int> relativeSortArray(vector<int>& arr1, vector<int>& arr2) {
        vector<int> result;
        for (int i = 0; i < arr2.size(); i++) {
            for (int j = 0; j < arr1.size(); j++) {
                if (arr1.at(j) == arr2.at(i)) {
                    result.push_back(arr1.at(j));
                    arr1.erase(arr1.begin() + j);
                }
            }
        }
        for (int i = 0; i < arr1.size(); i++) {
            result.push_back(arr1.at(i));
        }
        return result;
    }
};
// @lc code=end
