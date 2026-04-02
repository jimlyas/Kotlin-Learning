# Kotlin Playground Links

Copy each code snippet, paste it into https://play.kotlinlang.org, click "Share" → copy the link, then add it below.

---

## 1-2-first-program.html

```
fun main() {
    println("Hello, Kotlin!")
    // Add your own code below
}
```

**Link:** https://pl.kotl.in/I-TH8RPxv

---

## 1-3-variables.html

```
fun main() {
    val greeting = "Hello"
    var number = 10
    
    println(greeting)
    println(number)
    
    number = 20
    println(number)
}
```

**Link:** https://pl.kotl.in/JIlCoonT0

---

## 1-5-control-flow.html

```
fun main() {
    val a = 10
    val b = 20
    val max = if (a > b) a else b
    println("Max: $max")
    
    val day = 3
    val dayName = when (day) {
        1 -> "Monday"
        2 -> "Tuesday"
        3 -> "Wednesday"
        4 -> "Thursday"
        5 -> "Friday"
        else -> "Weekend"
    }
    println("Day: $dayName")
    
    for (i in 1..5) {
        print("$i ")
    }
    println()
    
    var count = 5
    while (count > 0) {
        print("$count ")
        count--
    }
}
```

**Link:** https://pl.kotl.in/8yPJIrVoQ

---

## 1-6-functions.html

```
fun main() {
    fun add(a: Int, b: Int): Int = a + b
    
    fun greet(name: String, greeting: String = "Hello") = 
        "$greeting, $name!"
    
    println(add(3, 5))
    println(greet("Kotlin"))
    println(greet("World", "Hi"))
}
```

**Link:** https://pl.kotl.in/O4WLLcvoL

---

## 1-7-oop.html

```
data class Point(val x: Int, val y: Int)

fun main() {
    val p1 = Point(1, 2)
    val p2 = Point(1, 2)
    val p3 = p1.copy(x = 3)
    
    println(p1)
    println(p1 == p2)
    println(p3)
}
```

**Link:** https://pl.kotl.in/n-e2CW15K

---

## 1-8-collections.html

```
fun main() {
    val numbers = listOf(1, 2, 3, 4, 5)
    println("List: $numbers")
    println("First: ${numbers.first()}")
    println("Last: ${numbers.last()}")
    
    val unique = setOf(1, 2, 2, 3, 3, 3)
    println("Set: $unique")
    
    val scores = mapOf("Alice" to 95, "Bob" to 87)
    println("Map: $scores")
    println("Alice's score: ${scores["Alice"]}")
}
```

**Link:** https://pl.kotl.in/2kojSyEZt

---

## 1-9-lambdas-hof.html

```
fun main() {
    val numbers = listOf(1, 2, 3, 4, 5)
    
    val doubled = numbers.map { it * 2 }
    println("Doubled: $doubled")
    
    val evens = numbers.filter { it % 2 == 0 }
    println("Evens: $evens")
    
    val sum = numbers.reduce { acc, n -> acc + n }
    println("Sum: $sum")
    
    val result = numbers
        .map { it * it }
        .filter { it % 2 == 0 }
        .reduce { acc, n -> acc + n }
    println("Chained result: $result")
}
```

**Link:** https://pl.kotl.in/sIxr-wPIh

---

## 2-2-arrays.html

```
fun main() {
    val nums = intArrayOf(2, 7, 11, 15)
    val target = 9
    
    val map = mutableMapOf<Int, Int>()
    for ((index, num) in nums.withIndex()) {
        val complement = target - num
        if (map.containsKey(complement)) {
            println("Indices: ${map[complement]}, $index")
            break
        }
        map[num] = index
    }
}
```

**Link:** https://pl.kotl.in/CCpf_Yew_

---

## 2-3-linked-lists.html

```
class ListNode(var value: Int) {
    var next: ListNode? = null
}

fun reverseList(head: ListNode?): ListNode? {
    var prev: ListNode? = null
    var current = head
    
    while (current != null) {
        val next = current.next
        current.next = prev
        prev = current
        current = next
    }
    return prev
}

fun main() {
    val node1 = ListNode(1)
    val node2 = ListNode(2)
    val node3 = ListNode(3)
    node1.next = node2
    node2.next = node3
    
    val reversed = reverseList(node1)
    println("Reversed: ${reversed?.value}")
}
```

**Link:** https://pl.kotl.in/ozLICrkn5

---

## 2-4-stack.html

```
fun isValid(s: String): Boolean {
    val stack = ArrayDeque<Char>()
    val matching = mapOf('(' to ')', '[' to ']', '{' to '}')
    
    for (c in s) {
        if (c in matching) {
            stack.addLast(c)
        } else {
            if (stack.isEmpty() || matching[stack.last()] != c) {
                return false
            }
            stack.removeLast()
        }
    }
    return stack.isEmpty()
}

fun main() {
    println(isValid("()"))
    println(isValid("()[]{}"))
    println(isValid("(]"))
}
```

**Link:** https://pl.kotl.in/1QUhXNN1C

---

## 2-5-queue.html

```
class RecentCounter() {
    private val queue = ArrayDeque<Int>()
    
    fun ping(t: Int): Int {
        queue.addLast(t)
        while (queue.first() < t - 3000) {
            queue.removeFirst()
        }
        return queue.size
    }
}

fun main() {
    val counter = RecentCounter()
    println(counter.ping(1))
    println(counter.ping(100))
    println(counter.ping(3001))
    println(counter.ping(3002))
}
```

**Link:** https://pl.kotl.in/pmJuPZGjX

---

## 2-6-hash-map.html

```
fun isAnagram(s: String, t: String): Boolean {
    if (s.length != t.length) return false
    
    val count = HashMap<Char, Int>()
    for (c in s) {
        count[c] = count.getOrDefault(c, 0) + 1
    }
    for (c in t) {
        count[c] = count.getOrDefault(c, 0) - 1
        if (count[c]!! < 0) return false
    }
    return true
}

fun main() {
    println(isAnagram("anagram", "nagaram"))
    println(isAnagram("rat", "car"))
}
```

**Link:** https://pl.kotl.in/moTXXHdMh

---

## 2-7-binary-tree-bst.html

```
class TreeNode(var value: Int) {
    var left: TreeNode? = null
    var right: TreeNode? = null
}

fun maxDepth(root: TreeNode?): Int {
    if (root == null) return 0
    val leftDepth = maxDepth(root.left)
    val rightDepth = maxDepth(root.right)
    return maxOf(leftDepth, rightDepth) + 1
}

fun main() {
    val root = TreeNode(3)
    root.left = TreeNode(9)
    root.right = TreeNode(20)
    root.right?.left = TreeNode(15)
    root.right?.right = TreeNode(17)
    
    println(maxDepth(root))
}
```

**Link:** https://pl.kotl.in/HHVsa3vEe

---

## 3-1-sorting.html

```
fun bubbleSort(arr: IntArray): IntArray {
    val n = arr.size
    for (i in 0 until n - 1) {
        for (j in 0 until n - i - 1) {
            if (arr[j] > arr[j + 1]) {
                val temp = arr[j]
                arr[j] = arr[j + 1]
                arr[j + 1] = temp
            }
        }
    }
    return arr
}

fun main() {
    val nums = intArrayOf(64, 34, 25, 12, 22, 11, 90)
    println("Original: ${nums.joinToString()}")
    println("Sorted: ${bubbleSort(nums).joinToString()}")
}
```

**Link:** https://pl.kotl.in/b-_XMx6Zx

---

## 3-2-searching.html

```
fun search(nums: IntArray, target: Int): Int {
    var left = 0
    var right = nums.size - 1
    
    while (left <= right) {
        val mid = left + (right - left) / 2
        when {
            nums[mid] == target -> return mid
            nums[mid] < target -> left = mid + 1
            else -> right = mid - 1
        }
    }
    return -1
}

fun main() {
    val nums = intArrayOf(-1, 0, 3, 5, 9, 12)
    println(search(nums, 9))
    println(search(nums, 2))
}
```

**Link:** https://pl.kotl.in/D3BuDyGx7

---

## 3-3-recursion.html

```
fun fib(n: Int): Int {
    if (n <= 1) return n
    var a = 0
    var b = 1
    for (i in 2..n) {
        val temp = a + b
        a = b
        b = temp
    }
    return b
}

fun main() {
    for (i in 0..10) {
        print("${fib(i)} ")
    }
}
```

**Link:** https://pl.kotl.in/dAuk2x9aQ

---
