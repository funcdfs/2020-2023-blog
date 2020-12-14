---
title: 数组练习:简单难度
category: vector
---

::: tip
以下顺序从leetcode通过率由低到高进行
:::
<!-- more -->
## 数组练习


## 2020-05-04
### 1431

@[code lang=cpp](@/code/leetcode/1431.拥有最多糖果的孩子.cpp/)

>发现 c++学的很乱，并没有完全掌握。写题的时候重新整理一次 STL 的每一个部分
### 1295

@[code lang=cpp](@/code/leetcode/1295.统计位数为偶数的数字.cpp/)

### 1313

@[code lang=cpp](@/code/leetcode/1313.解压缩编码列表.cpp/)

没什么含量，都很简单

## 2020-05-05

>Leetcode 1389.1266.1351.1266.1299

<!-- more -->

### 📌1299
@[code lang=cpp](@/code/leetcode/1299.将每个元素替换为右侧最大元素.cpp/)

### 1389
@[code lang=cpp](@/code/leetcode/1389.按既定顺序创建目标数组.cpp/)

### 1351
@[code lang=cpp](@/code/leetcode/1351.统计有序矩阵中的负数.cpp/)

### 1365
@[code lang=cpp](@/code/leetcode/1365.有多少小于当前数字的数字.cpp/)

### 1266
@[code lang=cpp](@/code/leetcode/1266.访问所有点的最小时间.cpp/)


>Leetcode 1252 1304 832

<!-- more -->

## 2020-05-07

### 📌1252 奇数值单元格的数目
#### 方法一:模拟

我们可以使用一个 n * m 的矩阵来存放操作的结果，对于 indices 中的每一对 `[ri, ci]`，将矩阵第 ri 行的所有数增加 1，第 ci 列的所有数增加 1。

在所有操作模拟完毕后，我们遍历矩阵，得到奇数的数目。这个方法也是我开始做用的方法，简明易懂，但是没有考虑任何优化，时间也是最慢的。

```cpp
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

class Solution
{
public:
    int oddCells(int n, int m, vector<vector<int>> &indices)
    {
        int result = 0;
        vector<vector<int>> init(n, vector<int>(m, 0));
        for (int i = 0; i < indices.size(); i++)
        {
            for (int j = 0; j < m; j++)
            {
                init[indices[i][0]][j]++;
            }
        }
        for (int i = 0; i < indices.size(); i++)
        {
            for (int j = 0; j < n; j++)
            {
                init[j][indices[i][1]]++;
            }
        }//以后循环最好分开写，因为数组边界不考虑清楚很容易写错
        for (int i = 0; i < n; i++)
        {
            for (int j = 0; j < m; j++)
            {
                if (init[i][j] % 2 == 1)
                    result++;
            }
        }
        init.claear();
        return result;
    }
};
```

- 44/44 cases passed (8 ms)
- Your runtime beats 52.69 % of cpp submissions
- Your memory usage beats 100 % of cpp submissions (8.1 MB)


#### 方法二:模拟 + 空间优化

由于每次操作只会将一行和一列的数增加 1，因此我们可以使用一个行数组 rows 和列数组 cols 分别记录每一行和每一列被增加的次数。对于 indices 中的每一对 `[ri, ci]`，我们将 rows[ri] 和 cols[ci] 的值分别增加 1。

在所有操作模拟完毕后，矩阵中位于 (x, y) 位置的数即为` rows[x] + cols[y]`。我们遍历矩阵，得到奇数的数目。

@[code lang=cpp](@/code/leetcode/1252.奇数值单元格的数目.cpp/)

>将一个二维数组变成了两个一维数组，正方形的空间变成了两条边的空间，因为事实上正方形中间的每一个点都可以通过边上的数值得出

- 44/44 cases passed (8 ms)
- Your runtime beats 52.69 % of cpp submissions
- Your memory usage beats 100 % of cpp submissions (8 MB)

### 1304 和为零的n个唯一整数

- 42/42 cases passed (0 ms)
- Your runtime beats 100 % of cpp submissions
- Your memory usage beats 100 % of cpp submissions (6.7 MB)

因为题目限制较少，所以双百完成

[@code lang=cpp](@/code/leetcode/1304.和为零的n个唯一整数.cpp)

官方答案:

```cpp
class Solution {
public:
    vector<int> sumZero(int n) {
        vector<int> ans;
        int sum = 0;
        for (int i = 0; i < n - 1; ++i) {
            ans.push_back(i);
            sum += i;
        }
        ans.push_back(-sum);
        return ans;
    }
};
```

我的更快一点

### 832.翻转图像

Accepted
- 82/82 cases passed (8 ms)
- Your runtime beats 60.43 % of cpp submissions
- Your memory usage beats 100 % of cpp submissions (8.8 MB)

[@code lang=cpp](@/code/leetcode/832.翻转图像.cpp)


## 2020-05-08

### 📌 1051 高度检查器

上来觉得比较简单，找规律的题

```cpp
int heightChecker(vector<int>& heights) {
         int result = 0;
         for (int i = 1; i < heights.size(); i++) {
             //遇到后面比前面小的，从后面一段元素中找出最小的那一个进行交换
             if (heights.at(i - 1) > heights.at(i)) {
                 //42  at(I)=2
                 int mini = i;  // mini 为后面一段元素中最小元素对应的下标
                 for (int j = i + 1; j < heights.size(); j++) {
                     if (heights.at(j) < heights.at(mini)) {
                         mini = j;
                     }
                 }
                 swap(heights.at(i - 1), heights.at(mini));
                 result++;
             }
         }
         return result;
     }
```

注意题目要求:请你返回能让所有学生以 非递减 高度排列的最小必要移动人数。
返回的是移动人员的数量，而不是交换的次数

然后就尝试添加一个 bool 类型来保存一个数字是否被移动过

```cpp
 int heightChecker(vector<int>& heights) {
        int result = 0;
        vector<bool> flag(heights.size(), false);
        //额外开辟一个空间用来存放这个学生是否被移动过，初始全为没有动过
        for (int i = 1; i < heights.size(); i++) {
            //遇到后面比前面小的，从后面一段元素中找出最小的那一个进行交换
            if (heights.at(i - 1) > heights.at(i)) {
                int mini = i;  // mini 为后面一段元素中最小元素对应的下标
                for (int j = i + 1; j < heights.size(); j++) {
                    if (heights.at(j) < heights.at(mini)) {
                        mini = j;
                    }
                }
/* 114213//移动了两个
 * 111243//又移动了一个*/
                swap(heights.at(i - 1), heights.at(mini));
                //交换后的元素bool数组仍然应该一一对应，用二维数组来存储太浪费空间，所以一起交换
                swap(flag.at(i - 1), flag.at(mini));
                if (!flag[i - 1]) {
                    flag[i - 1] = true;
                }
                if (!flag[mini]) {
                    flag[mini] = true;
                }
            }
        }
```

但是这种测试样例依然不过
[2,1,2,1,1,2,2,1]
Answer
7
Expected Answer
4

我是想不出来方法了，所以看题解


![2020-05-08-17-13-02](https://raw.githubusercontent.com/fengwei2002/Pictures_02/master/img/2020-05-08-17-13-02.png)

wc？？？,所以以后还是仔细构思找规律，转换为简单问题比较好

@[code lang=cpp](@/code/leetcode/1051.高度检查器.cpp/)

- 81/81 cases passed (52 ms)
- Your runtime beats 26.87 % of cpp submissions
- Your memory usage beats 33.33 % of cpp submissions (8.5 MB)

懵逼树下你和我，tql

### 1385 两个数组间的距离值

一道水题，没什么好说的

Accepted
- 103/103 cases passed (120 ms)
- Your runtime beats 5.05 % of cpp submissions
- Your memory usage beats 100 % of cpp submissions (6.9 MB)

@[code lang=cpp](@/code/leetcode/1385.两个数组间的距离值.cpp/)


### 977 有序数组的平方

简单题，但是我的效率不高

Accepted
- 132/132 cases passed (136 ms)
- Your runtime beats 14.79 % of cpp submissions
- Your memory usage beats 25 % of cpp submissions (24.9 MB)

@[code lang=cpp](@/code/leetcode/977.有序数组的平方.cpp/)


运行时间快一点点的双指针写法:

- 132/132 cases passed (56 ms)
- Your runtime beats 70.26 % of cpp submissions
- Your memory usage beats 25 % of cpp submissions (24.7 MB)

```cpp
class Solution {
public:
    vector<int> sortedSquares(vector<int>& A)
    {
        int len = A.size();
        vector<int> ans(len);
        //开辟结果数组
        int a = 0, b = len - 1, i = b;
        //用i逆序遍历，a正序遍历
        while (i >= 0)
        {
            int lef = A[a] * A[a], rig = A[b] * A[b];
            if (lef > rig) ans[i] = lef, a++;
            else ans[i] = rig, b--;
            i--;
        }
        return ans;
    }
};
```
## 2020-05-09

>Leetcode 1380 561 1413 999

<!-- more -->

### 1380 矩阵中的幸运数

开始想错了，用两个数组保存最大值的最小值，输出对应下标相等并且对应值相等的数字

最后用暴力方法解决

- 103/103 cases passed (28 ms)
- Your runtime beats 46.05 % of cpp submissions
- Your memory usage beats 100 % of cpp submissions (8.2 MB)

@[code lang=cpp](@/code/leetcode/1380.矩阵中的幸运数.cpp/)


因为题目已知

矩阵中的数字 **各不相同** 。请你按 任意 顺序返回矩阵中的所有幸运数。

> 各不相同还是加粗字体，我遗漏了这一个条件

所以存在这种更加高效的方法:

得到每行最小和每列最大后，判断是否有相等值。如果有则肯定是同一个数，因为矩阵没有相同元素，减少了几次重复遍历

- 103/103 cases passed (20 ms)
- Your runtime beats 96.75 % of cpp submissions
- Your memory usage beats 100 % of cpp submissions (8.2 MB)

```cpp
class Solution {
   public:
    vector<int> luckyNumbers(vector<vector<int>>& matrix) {
        vector<int> res;

        int m = matrix.size();
        int n = matrix[0].size();

        vector<int> row_min(m, 100000);
        vector<int> row_index(m, 0);
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                if (row_min[i] > matrix[i][j]) {
                    row_min[i] = matrix[i][j];
                    row_index[i] = j;
                }
            }
        }

        vector<int> col_max(n, 0);

        for (int j = 0; j < n; j++) {
            for (int i = 0; i < m; i++) {
                if (col_max[j] < matrix[i][j]) {
                    col_max[j] = matrix[i][j];
                }
            }
        }
        for (int i = 0; i < m; i++) {
            if (row_min[i] == col_max[row_index[i]]) {
                res.push_back(row_min[i]);
            }
        }

        return res;
    }
};
```

### 561 数组拆分-i

- 81/81 cases passed (164 ms)
- Your runtime beats 27.54 % of cpp submissions
- Your memory usage beats 11.11 % of cpp submissions (26.8 MB)

效率很低，可能方法不对；

@[code lang=cpp](@/code/leetcode/561.数组拆分-i.cpp/)


### 1413 逐步求和得到正数的最小值

Accepted
- 53/53 cases passed (0 ms)
- Your runtime beats 100 % of cpp submissions
- Your memory usage beats 100 % of cpp submissions (7.5 MB)

没什么，很简单。

@[code lang=cpp](@/code/leetcode/1413.逐步求和得到正数的最小值.cpp/)

### 999 可以被一步捕获的棋子数

Accepted
- 22/22 cases passed (0 ms)
- Your runtime beats 100 % of cpp submissions
- Your memory usage beats 100 % of cpp submissions (6.4 MB)


一道模拟题，读清楚题目就行


@[code lang=cpp](@/code/leetcode/999.可以被一步捕获的棋子数.cpp/)

## 2020-05-10

>Leetcode 1160 905 1394 1217 867 922

<!-- more -->

### 📌1160 拼写单词

- 36/36 cases passed (132 ms)
- Your runtime beats 47.08 % of cpp submissions
- Your memory usage beats 100 % of cpp submissions (14.3 MB)

想法正确后就是认真写代码了，注意自动补全的for循环变量必须同时将i修改！

还有就是每一个边界情况要考虑清楚

@[code lang=cpp](@/code/leetcode/1160.拼写单词.cpp/)

### 905.按奇偶排序数组

@[code lang=cpp](@/code/leetcode/905.按奇偶排序数组.cpp/)

### 1394.找出数组中的幸运数

>可以直接想出很简便的方法时就不用看题解了

@[code lang=cpp](@/code/leetcode/1394.找出数组中的幸运数.cpp/)

### 1217.玩筹码

Accepted
- 50/50 cases passed (0 ms)
- Your runtime beats 100 % of cpp submissions
- Your memory usage beats 100 % of cpp submissions (7.2 MB)

shuaiqi

@[code lang=cpp](@/code/leetcode/1217.玩筹码.cpp/)

### 867.转置矩阵

Accepted
- 36/36 cases passed (20 ms)
- Your runtime beats 46.29 % of cpp submissions
- Your memory usage beats 100 % of cpp submissions (10.1 MB)

@[code lang=cpp](@/code/leetcode/867.转置矩阵.cpp/)

### 📌 922.按奇偶排序数组-ii

Accepted
- 61/61 cases passed (48 ms)
- Your runtime beats 30.83 % of cpp submissions
- Your memory usage beats 7.14 % of cpp submissions (20.4 MB)


```cpp
class Solution {
   public:
    vector<int> sortArrayByParityII(vector<int>& A) {
        // A 数组元素数量为偶数
        //对数组进行排序，以便当 A[i] 为奇数时，i 也是奇数；当 A[i] 为偶数时，
        // i也是偶数。
        vector<int> result(A.size(), 0);
        unsigned int index_j = 1;
        unsigned int index_o = 0;
        for (int i = 0; i < A.size(); i++) {
            if (A.at(i) % 2 == 1) {
                result.at(index_j) = A.at(i);
                index_j += 2;
            } else {
                result.at(index_o) = A.at(i);
                index_o += 2;
            }
        }
        return result;
    }
};
```
效率有点低，看一下题解

方法一:就是我的写法

方法二: 双指针
思路

一种不需要开辟额外空间的解法。

在这个问题里面，一旦所有偶数都放在了正确的位置上，那么所有奇数也一定都在正确的位子上。所以只需要关注 A[0], A[2], A[4], ... 都正确就可以了。

每次从奇数队列中找到第一个偶数进行交换的时候，都要从最开始进行一次遍历，所以这里还可以优化一下，采用记录上一次结束的位置，下一次查找直接从这个位置开始查找即可，这样当数据集中在后面的时候就会省下来很多时间

试一下:

@[code lang=cpp](@/code/leetcode/922.按奇偶排序数组-ii.cpp/)

应该优化的每一个地方也优化了，很好

***

简单明确的一种写法

```cpp
class Solution {
public:
    vector<int> sortArrayByParityII(vector<int>& A) {
        for(int i=0,j=1;i<A.size();i+=2){
        	if(A[i]%2==1){
        		while(A[j]%2==1)j+=2;
                //人家用了这种写法，代替了我用last_index保存上一次下标的写法
        		swap(A[i],A[j]);
                //能看懂是能看懂，自己写就写不出来这么简洁的代码
			}
		}
		return A;
    }
};
```

呼，完成

>今天敲了十小时代码。。。上头了...
![2020-05-10-22-10-59](https://raw.githubusercontent.com/fengwei2002/Pictures_02/master/img/2020-05-10-22-10-59.png)
![2020-05-10-22-13-03](https://raw.githubusercontent.com/fengwei2002/Pictures_02/master/img/2020-05-10-22-13-03.png)



## 2020-05-26


>Leetcode 1002 509 118 1200 1122

<!-- more -->

### 📌 1002.查找常用字符

这种方法的话想法应该正确了，但是还是比较麻烦，不简洁

```cpp
#include <iostream>
#include <vector>
using namespace std;

class Solution {
   public:
    //返回字符串数组所有的重复字母
    vector<string> commonChars(vector<string>& A) {
        //将一个单词对应的字母出现次数保存下来,
        //然后对第二个单词进行字母次数的映射,
        //将非 0的相同的字母频次保存下来继续进行比较
        //相同对应字母频次不变下一个字母，不相同就将对应数字置为 0
        vector<string> result;1
        int last_fre[26] = {0};  //之前单词的字母频次
        int next_fre[26] = {0};//下一个单词的频次
        for (int k = 0; k < A.at(0).size(); k++) {
            last_fre[A.at(0).at(k) - 'a']++;
        }  //初始化字母频次表
        for (int i = 0; i < A.size(); i++) {
            //遍历所有单词
            for (int k = 1; k < A.at(i).size(); k++) {
                next_fre[A.at(i).at(k) - 'a']++;
            }
            //得到每个单词对应的单词表
            for (int j = 0; j < 26; j++) {
                if (last_fre[j] != next_fre[j]) {
                    last_fre[j] = 0;
                }
            }
            //将与模板不同的单位变成0
            for (int j = 0; j < 26; j++) {
                last_fre[j] = 0;
            }
            //全部置为0供下一次使用
        }
        for (int i = 0; i < 26; i++) {
            if (last_fre[i] != 0) {
                char convert = 'a' + last_fre[i];
                string a(1, convert);
                result.push_back(a);
            }
        }
        //这到题返回的答案应该是字符数组，而不是字符串数组
        //所以也是出题不严谨
        //这时就需要将数字先转换为 char 类型，然后再转换为 string
        //因为数字直接转换的话就是将 10 变为了 "10" 并不是最终目标
        return result;
    }
};
```

参考别人的题解发现一个很简明的写法:

@[code lang=cpp](@/code/leetcode/1002.查找常用字符.cpp/)

### 📌 509.斐波那契数

[百度百科斐波那契数](https://baike.baidu.com/item/%E6%96%90%E6%B3%A2%E9%82%A3%E5%A5%91%E6%95%B0%E5%88%97)讲了他的所有信息

其中提到了计算时的通项公式:

![2020-05-24-19-48-43](https://raw.githubusercontent.com/fengwei2002/Pictures_02/master/img/2020-05-24-19-48-43.png)

性质:越到后面，$\cfrac{a_n}{a_{n+1}}$ 的比值越接近黄金比。

[labuladong 的动态规划题解](https://leetcode-cn.com/problems/fibonacci-number/solution/dong-tai-gui-hua-tao-lu-xiang-jie-by-labuladong/)

自底向上进行计算就🆗了

@[code lang=cpp](@/code/leetcode/509.斐波那契数.cpp/)

### 118.杨辉三角

- 15/15 cases passed (0 ms)
- Your runtime beats 100 % of cpp submissions
- Your memory usage beats 100 % of cpp submissions (6.8 MB)

@[code lang=cpp](@/code/leetcode/118.杨辉三角.cpp/)

### 1200.最小绝对差

@[code lang=cpp](@/code/leetcode/1200.最小绝对差.cpp/)


### 📌 1122.数组的相对排序

一开始的想法是遍历两个数组，将相同的放入结果中，放入一个删除一个，然后**对剩余的元素进行排列**，再依次放入结果中即可


```cpp
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
        //将剩余元素都放入结果中
        sort(arr1.begin(), arr1.end());
        for (int i = 0; i < arr1.size(); i++) {
            result.push_back(arr1.at(i));
        }
        return result;
    }
};
```

Wrong Answer
15/16 cases passed (N/A)

因为移除元素的过程可能出现了**部分后面的元素未考虑**，并且也不应该修改传入数组中的元素

于是做了以下的修改，通过

@[code lang=cpp](@/code/leetcode/1122.数组的相对排序.cpp/)

> 所以不会写的题放上一两天再看一遍就会出现新的思路或者发现已经存在的bug

## 2020-05-29


> Leetcode 766 566 1399 

<!-- more -->

::: tip today
上午优化了vscode主题 fengwei2002 的全部细节，现在用着很舒服，也很好看
下午写了写 leetcode 
:::

### 766.托普利茨矩阵

@[code lang=cpp](@/code/leetcode/766.托普利茨矩阵.cpp/)

### 566.重塑矩阵

数组的坐标问题仔细一点就可以AC

还有就是leetcode数据从前往后如果遇到一个不满足的，后面的测试用例就不会被测试

节省了服务器的时间，但是不是能很好的反映出代码的问题比例

@[code lang=cpp](@/code/leetcode/566.重塑矩阵.cpp/)

### 1399.统计最大组的数目

使用hash表，以后再看一遍

@[code lang=cpp](@/code/leetcode/1399.统计最大组的数目.cpp/)


## 2020-09-19 

> 1480，1108，🎈1221 
<!-- more -->

我才18岁，我可以成为任何我想成为的人 💪


::: today
开学第一刷，先复习了一下之前记录下来的vector的用法:
https://konng.now.sh/posts/2020/05/05/_01-stl%E4%B8%AD%E7%9A%84-vector.html
然后开学后的小目标就是把 GitHub 主页染成绿的
![2020-09-07-20-18-33](https://raw.githubusercontent.com/fengwei2002/Pictures_02/master/img/2020-09-07-20-18-33.png)

呼，好久没有安安静静下来摸键盘了
今天四级考试结束了，然后聊天和游戏也没有什么必要了
这一年来，我好像完全认清了自己呢
凡人而已，我不是神，没有任何值得别人喜欢的价值
所以呢，安安静静的学习就行了呗，忙起来以后时间就变的快了呢
希望两年内，让自己变得不这么废物，可以找到一点点谋生的手段
呼，不知道什么时候就长大了啊，明明我才刚刚十八岁，但是我都已经十八岁了还是什么都没有
不写了呢，好好学习最重要，调整心态，亡羊补牢,为时未晚
再在知乎输出一些教程类文章（频繁持续的点赞总是让人满足），做一些高价值的作品
大学期间还是应该做一些以后可以回忆的事情，和世俗斤斤计较属实没什么意思嗯嗯就这样
:::

### 1480.一维数组的动态和

@[code lang=cpp](@/code/leetcode/1480.一维数组的动态和.cpp/)

### 1108.ip-地址无效化.cpp

string 的常用方法官方解释
http://www.cplusplus.com/reference/string/string/?kw=string

@[code lang=cpp](@/code/leetcode/1108.ip-地址无效化.cpp/)

:::tip
注意处理函数后**要抛回一个返回值**给系统，否则会出现
`Char 5: fatal error: control reaches end of non-void function [-Wreturn-type]
    };` 类型报错
:::

### 🎈1221.分割平衡字符串.cpp

::: tip
对空指针操作时会出现:
`terminate called after throwing an instance of 'std::logic_error' terminate called after throwing an instance of 'std::logic_error' what(): basic_string::_M_construct null not valid`
:::

第一次尝试:

```cpp

class Solution {
   public:
    int balancedStringSplit(string s) {
        //有点东西
        int num = 0;
        //写题第一步就是看清题目，不急
        for (int i = 0; i < s.length(); i++) {
            if (s.at(i) == 'R') {
                num += 1;  // b
                for (int j = i; j < s.length(); j++) {
                    if (s.at(j) != 'R') {
                        i = j - 1;
                        break;
                    }
                }
            }
            //循环结束时，循环变量才会执行for循环的累加操作，所以要避免空指针的调用
        }
        return num;
    }
};
```
尝试偷懒，但是对于数据:`RL LLRR RL`，明明有三对，但是还考虑为2对，不管单独考虑R还是单独考虑L的结果都是一样的

没有什么好的想法:

题解有人说:

题目是对两个字符进行操作,那么自然会考虑到字符的asc码
L和R的中间字符O,即L-O=-3;R-O=3,
原串就可以转化为3和-3的序列,这么看思路就很清晰了,
题目要求子串中ΣL=ΣR,**并未要求L和R结构对称**,再加上所有分割出的子串都必须为平衡串
那么其实就是求±3序列的前缀和为0的次数

```cpp
class Solution {
public:
    int balancedStringSplit(string s) {
        int nums=0,ans=0;
        for(auto i:s) 
            ans += ((nums+=(i-'O'))==0);
        return ans;
    }
};
```
//逐项考虑，当等于零时answer+1，牛死了Orz

没有一个字母是废物字母，并且语义也表达的很明确，天秀好吗

@[code lang=cpp](@/code/leetcode/1221.分割平衡字符串.cpp/)

::: tip
auto关键字用法C++分类下写了详细介绍
以后还是先预览再进行推送，毕竟自己写完的自己不看一遍是不是有点不应该，每个文件一次commit即可
:::

## 2020-10-26 


>  🎈804 🎈1309 1370 

<!-- more -->

::: tip today
数据结构课用来刷题，这样可以保持专心，时间利用最大化
好像没有什么可以玩电脑的时间，打游戏的时间用来写题好了，好久没有认真写题了
是啊，又过去一个月 努力！
:::

### 🎈804.唯一摩尔斯密码词

不会写啊，想法应该没问题，但不知道哪里出问题了

::: details 错误代码
```cpp
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
        string* ans = new string[words.size()];
        //注意new的用法，new永远在后面
        for (int i = 0; i < words.size(); i++) {
            for (int j = 0; j < words.at(i).length(); j++) {
                int a = words.at(i).at(j) - 'a';
                ans[i] += tem[a];
            }
        }
        //无脑遍历先将所有结果放入ans数组中避免单个循环过于复杂

        //再利用一个双重循环数组进行去重
        int result = words.size();
        bool* flag = new bool[words.size()];
        for (int i = 0; i < words.size(); i++) {
            flag[i] = true;
        }

        for (int i = 0; i < words.size(); i++) {
            for (int j = 0; j < words.size(); j++) {
                if (flag[j] == true && ans[j] == ans[i]) {
                    flag[j] = false;
                    result--;
                    break;
                }
            }
        }
        delete[] ans;
        delete[] flag;
        return result;
    }
};
```
:::


@[code lang=cpp](@/code/leetcode/804.唯一摩尔斯密码词.cpp/)

### 1309.解码字母到整数映射

逆序字符串的多种方法:

https://www.educative.io/edpresso/how-to-reverse-a-string-in-cpp

使用逆循环遍历数组的时候需要`for (int i = len - 1; i >= 0; i--)`

@[code lang=cpp](@/code/leetcode/1309.解码字母到整数映射.cpp/)

### 🎈1370

@[code lang=cpp](@/code/leetcode/.cpp/)

脑子长时间不用就废了，亡羊补牢，为时未晚
