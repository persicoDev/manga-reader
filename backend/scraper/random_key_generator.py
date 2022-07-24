import string
import random


S = 16

ran = ''.join(random.choices(string.ascii_lowercase + string.digits, k = S))    
print("The randomly generated string is : " + str(ran)) # print the random data  