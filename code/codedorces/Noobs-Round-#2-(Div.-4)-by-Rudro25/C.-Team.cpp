#include <bits/stdc++.h>
using namespace std;

#define PSB push_back
#define ll long long
#define FastIO               \
    ios::sync_with_stdio(0); \
    cin.tie(0);              \
    cout.tie(0);
constexpr ll mod = 1e9 + 7;
const ll N = 3e6 + 5;

int main() {
    FastIO

        int test;
    cin >> test;
    while (test--) {
        int n, k, team = 0;
        cin >> n >> k;
        vector<int> a(n);
        for (int i = 0; i < n; i++)
            cin >> a[i];
        sort(a.begin(), a.end());

        for (ll l = 0, r = n - 1; l <= r;) {
            if (a[r] >= k) {
                ++team;
                --r;
            } else if (a[r] + a[l] >= k && l != r) {
                ++team;
                ++l;
                --r;
            } else
                l++;
        }
        cout << team << endl;
    }
    return 0;
}