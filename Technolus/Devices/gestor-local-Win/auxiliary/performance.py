import time, datetime
def testPerf(funct):
    start = time.process_time()
    res = funct()
    end = time.process_time()
    total = end - start

    return  {
        'start': start,
        'total':total,
        'res':res
    }



def main():
    return 3      
    
res = testPerf(main)
print('result: {}'.format(res['res']))
print('total: {}'.format(res['total']))
print('start: {}'.format(res['start']))



