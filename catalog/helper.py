import random

def generateE_id():
    e_id = ''.join(random.choice('0123456789ABCDEFG') for i in range(12))
    return e_id
generateE_id();
