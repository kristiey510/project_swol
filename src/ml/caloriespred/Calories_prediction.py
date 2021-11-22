#!/usr/bin/env python
# coding: utf-8

# In[1]:


import pandas as pd
import numpy as np
from sklearn.linear_model import LogisticRegression
from sklearn.preprocessing import StandardScaler


# In[2]:


exer = pd.read_csv('exercise.csv')


# In[3]:


calo = pd.read_csv("calories.csv")


# In[4]:


pd.set_option('display.max_rows', 100000)
pd.set_option('display.max_columns', 100000)
pd.set_option('display.width', 10)


# In[5]:


print('This DataFrame Has %d samples and %d Features'%(exer.shape))


# In[6]:


exer.head(5)


# In[7]:


calo.head(5)


# In[8]:


#merge two datasets
dat = pd.merge(exer,calo)
dat.head()


# In[9]:


dat["Gender"].replace({"male": 1, "female": 0}, inplace=True)
dat.head()


# In[10]:


fea_matrix = dat.iloc[:,1:7]
target = dat.iloc[:,-1]


# In[11]:


fea_matrix_standardized = StandardScaler().fit_transform(fea_matrix)


# In[12]:


l = LogisticRegression(penalty='l2', dual=False, tol=1e-4,
C=1.0, fit_intercept=True,
intercept_scaling=1, class_weight=None,
random_state=None, solver='lbfgs',
max_iter=200, multi_class='auto',
verbose=0, warm_start=False, n_jobs=None,
l1_ratio=None)


# In[14]:


log_model = l.fit(fea_matrix_standardized, target)


# In[16]:


# gender, age, height, kg,duration,heart rate 
test = [[1,21,172,64,60,100]]
print(log_model.predict(test))


# In[ ]:





# In[ ]:




