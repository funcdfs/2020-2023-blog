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
        //将符合条件的元素放入result中即可
        int arr1_size = arr1.size();
        //记录数组的初始大小防止因为删除导致的部分遗漏
        for (int i = 0; i < arr2.size(); i++) {
            for (int j = 0; j < arr1.size(); j++) {
                if (arr1.at(j) == arr2.at(i)) {
                    result.push_back(arr1.at(j));
                }
            }
        }
        for (int i = 0; i < arr2.size(); i++) {
            for (int j = 0; j < arr1_size; j++) {
                if (arr1.at(j) == arr2.at(i)) {
                    arr1.erase(arr1.begin() + j);
                    arr1_size -= 1;
                }
            }
        }
        for (int i = 0; i < arr1_size; i++) {
            result.push_back(arr1.at(i));
        }
        return result;
    }
};
// @lc code=end
