1. redis 这么火的原因是？
在微服务架构多主机节点架构下，多线程并发读写的问题，它的解决之道是单线程访问

2. 为什么程序员会遇到一些看起来不可能出错的代码发生了错误？不了解原子性
底层原因也是多线程的问题，示例如下， 
      if (instance == null) {
          instance = new BrokenSingleton();
      }
这段代码看起来无论如何也不会出错，但它就是出现了问题，原因在于它不是原子操作，instance = new BrokenSingleton(); 这一步在 i++ 类似，在汇编层面是多步完成的，所以存在看起来解释不通的操作。
要注意volatile 是不能保证原子性的，所以要保证原子性，需要添加synchronized锁

class BrokenSingleton {
    private static BrokenSingleton instance; // 没有volatile
    
    public static BrokenSingleton getInstance() {
        if (instance == null) {
            synchronized (BrokenSingleton.class) {
                if (instance == null) {
                    // 问题：这个操作不是原子的，包含三个步骤：
                    // 1. 分配内存空间
                    // 2. 初始化对象
                    // 3. 将instance指向内存空间
                    // 
                    // 由于指令重排序，可能变成1->3->2的顺序
                    // 其他线程可能看到未初始化的对象
                    instance = new BrokenSingleton();
                }
            }
        }
        return instance;
    }
}

3. 