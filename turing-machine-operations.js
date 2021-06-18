const operations = {
    // Ini belum support operasi yang mengandung angka negatif
    'penjumlahan': 
    {
        'start-state': 'start',
        'end-state': 'end',

        'states':
        {
            'start': [
                {
                    'receive': 'X',
                    'move': 'right -> Q1'
                },
                {
                    'receive': 'Y',
                    'move': 'right -> Q2'
                },
                {
                    'receive': 'Z',
                    'write': 'B',
                    'move': 'right -> Q3'
                }
            ],
            
            'Q1': [
                {
                    'receive': '1',
                    'move': 'right'
                },
                {
                    'receive': '0',
                    'move': 'right'
                },
                {
                    'receive': 'X',
                    'write': '0',
                    'move': 'right -> Q4'
                },
                {
                    'receive': 'Y',
                    'move': 'left -> Q5'
                },
                {
                    'receive': 'Z',
                    'write': 'B',
                    'move': 'left -> Q6'
                }
            ],
            
            'Q2': [
                {
                    'receive': '1',
                    'move': 'right'
                },
                {
                    'receive': '0',
                    'move': 'right'
                },
                {
                    'receive': 'X',
                    'move': 'left -> Q5'
                },
                {
                    'receive': 'Y',
                    'write': '0',
                    'move': 'right -> Q4'
                },
                {
                    'receive': 'Z',
                    'write': 'B',
                    'move': 'left -> Q6'
                }
                
            ],

            'Q3': [
                {
                    'receive': 'X',
                    'move': 'right -> end'
                },
                {
                    'receive': '0',
                    'write': 'B',
                    'move': 'right'
                },
                {
                    'receive': 'Y',
                    'move': 'right -> end'
                },
            ],

            'Q4': [
                {
                    'receive': '1',
                    'write': '0',
                    'move': 'left -> Q7'
                },
                {
                    'receive': '0',
                    'move': 'right'
                },
                {
                    'receive': 'B',
                    'move': 'left -> Q6'
                },
            ],

            'Q5': [
                {
                    'receive': '0',
                    'move': 'left'
                },
                {
                    'receive': '1',
                    'write': '0',
                    'move': 'right -> Q9'
                },
                {
                    'receive': 'X',
                    'write': 'B',
                    'move': 'right -> Q10'
                },
                {
                    'receive': 'Y',
                    'write': 'B',
                    'move': 'right -> Q10'
                },
            ],
            
            'Q6': [
                {
                    'receive': '0',
                    'write': 'B',
                    'move': 'left'
                },
                {
                    'receive': '1',
                    'move': 'right -> end'
                },
            ],
            
            'Q7': [
                {
                    'receive': '1',
                    'move': 'right -> Q8'
                },
                {
                    'receive': '0',
                    'move': 'left'
                },
                {
                    'receive': 'B',
                    'move': 'left'
                },
            ],
            
            'Q8': [
                {
                    'receive': '0',
                    'write': '1',
                    'move': 'right -> Q4'
                },
            ],
            
            'Q9': [
                {
                    'receive': '0',
                    'move': 'right'
                },
                {
                    'receive': 'X',
                    'move': 'right'
                },
                {
                    'receive': 'Y',
                    'move': 'right'
                },
                {
                    'receive': '1',
                    'move': 'right'
                },
                {
                    'receive': 'B',
                    'move': 'left -> Q11'
                },
            ],
            
            'Q10': [
                {
                    'receive': '0',
                    'write': 'B',
                    'move': 'right -> Q10'
                },
                {
                    'receive': 'X',
                    'move': 'right -> end'
                },
                {
                    'receive': 'Y',
                    'move': 'right -> end'
                },
            ],
            
            'Q11': [
                {
                    'receive': 'X',
                    'move': 'left -> end'
                },
                {
                    'receive': 'Y',
                    'move': 'left -> end'
                },
                {
                    'receive': '1',
                    'write': 'B',
                    'move': 'left -> Q12'
                },
            ],
            
            'Q12': [
                {
                    'receive': '1',
                    'move': 'left -> Q13'
                },
                {
                    'receive': 'X',
                    'move': 'left -> Q14'
                },
                {
                    'receive': 'Y',
                    'move': 'left -> Q14'
                },
            ],
            
            'Q13': [
                {
                    'receive': '1',
                    'move': 'left'
                },
                {
                    'receive': 'X',
                    'move': 'left'
                },
                {
                    'receive': 'Y',
                    'move': 'left'
                },
                {
                    'receive': '0',
                    'move': 'left -> Q5'
                },
            ],
            
            'Q14': [
                {
                    'receive': '0',
                    'move': 'left'
                },
                {
                    'receive': '1',
                    'move': 'right -> Q15'
                },
                {
                    'receive': 'X',
                    'write': 'Z',
                    'move': 'right -> Q15'
                },
                {
                    'receive': 'Y',
                    'write': 'Z',
                    'move': 'right -> Q15'
                },
            ],
            
            'Q15': [
                {
                    'receive': '0',
                    'write': 'B',
                    'move': 'right'
                },
                {
                    'receive': '1',
                    'write': 'B',
                    'move': 'right'
                },
                {
                    'receive': 'X',
                    'write': 'B',
                    'move': 'right'
                },
                {
                    'receive': 'Y',
                    'write': 'B',
                    'move': 'right'
                },
                {
                    'receive': 'B',
                    'move': 'left -> end'
                },
            ],
            
            'end': []
        }
    },

    'pengurangan': 
    {
        'start-state': 'start',
        'end-state': 'end',

        'states':
        {
            'start': [
                {
                    'receive': 'X',
                    'move': 'right -> Q1'
                },
                {
                    'receive': 'Y',
                    'move': 'right -> Q2'
                },
                {
                    'receive': 'Z',
                    'write': 'B',
                    'move': 'right -> Q3'
                }
            ],
            
            'Q1': [
                {
                    'receive': '1',
                    'move': 'right'
                },
                {
                    'receive': '0',
                    'move': 'right'
                },
                {
                    'receive': 'X',
                    'write': 'Y',
                    'move': 'left -> Q5'
                },
                {
                    'receive': 'Y',
                    'write': '0',
                    'move': 'right -> Q4'
                },
                {
                    'receive': 'Z',
                    'write': 'B',
                    'move': 'left -> Q6'
                }
            ],
            
            'Q2': [
                {
                    'receive': '1',
                    'move': 'right'
                },
                {
                    'receive': '0',
                    'move': 'right'
                },
                {
                    'receive': 'X',
                    'write': '0',
                    'move': 'right -> Q4'
                },
                {
                    'receive': 'Y',
                    'write': 'X',
                    'move': 'left -> Q5'
                },
                {
                    'receive': 'Z',
                    'write': 'B',
                    'move': 'left -> Q6'
                }
                
            ],

            'Q3': [
                {
                    'receive': 'X',
                    'write': 'Y',
                    'move': 'right -> end'
                },
                {
                    'receive': '0',
                    'write': 'B',
                    'move': 'right'
                },
                {
                    'receive': 'Y',
                    'write': 'X',
                    'move': 'right -> end'
                },
            ],

            'Q4': [
                {
                    'receive': '1',
                    'write': '0',
                    'move': 'left -> Q7'
                },
                {
                    'receive': '0',
                    'move': 'right'
                },
                {
                    'receive': 'B',
                    'move': 'left -> Q6'
                },
            ],

            'Q5': [
                {
                    'receive': '0',
                    'move': 'left'
                },
                {
                    'receive': '1',
                    'write': '0',
                    'move': 'right -> Q9'
                },
                {
                    'receive': 'X',
                    'write': 'B',
                    'move': 'right -> Q10'
                },
                {
                    'receive': 'Y',
                    'write': 'B',
                    'move': 'right -> Q10'
                },
            ],
            
            'Q6': [
                {
                    'receive': '0',
                    'write': 'B',
                    'move': 'left'
                },
                {
                    'receive': '1',
                    'move': 'right -> end'
                },
            ],
            
            'Q7': [
                {
                    'receive': '1',
                    'move': 'right -> Q8'
                },
                {
                    'receive': '0',
                    'move': 'left'
                },
                {
                    'receive': 'B',
                    'move': 'left'
                },
            ],
            
            'Q8': [
                {
                    'receive': '0',
                    'write': '1',
                    'move': 'right -> Q4'
                },
            ],
            
            'Q9': [
                {
                    'receive': '0',
                    'move': 'right'
                },
                {
                    'receive': 'X',
                    'move': 'right'
                },
                {
                    'receive': 'Y',
                    'move': 'right'
                },
                {
                    'receive': '1',
                    'move': 'right'
                },
                {
                    'receive': 'B',
                    'move': 'left -> Q11'
                },
            ],
            
            'Q10': [
                {
                    'receive': '0',
                    'write': 'B',
                    'move': 'right -> Q10'
                },
                {
                    'receive': 'X',
                    'move': 'right -> end'
                },
                {
                    'receive': 'Y',
                    'move': 'right -> end'
                },
            ],
            
            'Q11': [
                {
                    'receive': 'X',
                    'move': 'left -> end'
                },
                {
                    'receive': 'Y',
                    'move': 'left -> end'
                },
                {
                    'receive': '1',
                    'write': 'B',
                    'move': 'left -> Q12'
                },
            ],
            
            'Q12': [
                {
                    'receive': '1',
                    'move': 'left -> Q13'
                },
                {
                    'receive': 'X',
                    'move': 'left -> Q14'
                },
                {
                    'receive': 'Y',
                    'move': 'left -> Q14'
                },
            ],
            
            'Q13': [
                {
                    'receive': '1',
                    'move': 'left'
                },
                {
                    'receive': 'X',
                    'move': 'left'
                },
                {
                    'receive': 'Y',
                    'move': 'left'
                },
                {
                    'receive': '0',
                    'move': 'left -> Q5'
                },
            ],
            
            'Q14': [
                {
                    'receive': '0',
                    'move': 'left'
                },
                {
                    'receive': '1',
                    'move': 'right -> Q15'
                },
                {
                    'receive': 'X',
                    'write': 'Z',
                    'move': 'right -> Q15'
                },
                {
                    'receive': 'Y',
                    'write': 'Z',
                    'move': 'right -> Q15'
                },
            ],
            
            'Q15': [
                {
                    'receive': '0',
                    'write': 'B',
                    'move': 'right'
                },
                {
                    'receive': '1',
                    'write': 'B',
                    'move': 'right'
                },
                {
                    'receive': 'X',
                    'write': 'B',
                    'move': 'right'
                },
                {
                    'receive': 'Y',
                    'write': 'B',
                    'move': 'right'
                },
                {
                    'receive': 'B',
                    'move': 'left -> end'
                },
            ],
            
            'end': []
        }
    },

    'perkalian':
    {
        'start-state': 'start',
        'end-state': 'end',

        'states':
        {
            'start': [
                {
                    'receive': '0',
                    'write': 'B',
                    'move': 'right -> Q24'
                },
                {
                    'receive': 'X',
                    'write': 'B',
                    'move': 'right -> Q1'
                },
                {
                    'receive': 'Y',
                    'write': 'B',
                    'move': 'right -> Q4'
                },
            ],
            'Q1': [
                {
                    'receive': '0',
                    'write': '0',
                    'move': 'right -> Q2'
                },
                {
                    'receive': '1',
                    'write': '1',
                    'move': 'right'
                },
            ],
            'Q2': [
                {
                    'receive': 'X',
                    'write': 'B',
                    'move': 'right -> Q6'
                },
                {
                    'receive': 'Y',
                    'write': 'B',
                    'move': 'right -> Q3'
                },
                {
                    'receive': 'B',
                    'write': 'B',
                    'move': 'left -> Q26'
                },
            ],
            'Q3': [
                {
                    'receive': '1',
                    'write': '1',
                    'move': 'right'
                },
                {
                    'receive': 'B',
                    'write': 'Y',
                    'move': 'left -> Q7'
                },
            ],
            'Q4': [
                {
                    'receive': '1',
                    'write': '1',
                    'move': 'right'
                },
                {
                    'receive': '0',
                    'write': '0',
                    'move': 'right -> Q5'
                },
            ],
            'Q5': [
                {
                    'receive': 'X',
                    'write': 'B',
                    'move': 'right -> Q3'
                },
                {
                    'receive': 'Y',
                    'write': 'B',
                    'move': 'right -> Q6'
                },
                {
                    'receive': 'B',
                    'write': 'B',
                    'move': 'right -> Q26'
                },
            ],
            'Q6': [
                {
                    'receive': '1',
                    'write': '1',
                    'move': 'right'
                },
                {
                    'receive': 'B',
                    'write': 'X',
                    'move': 'left -> Q7'
                },
            ],
            'Q7': [
                {
                    'receive': '1',
                    'write': '1',
                    'move': 'left'
                },
                {
                    'receive': 'B',
                    'write': 'B',
                    'move': 'left -> Q8'
                },
            ],
            'Q8': [
                {
                    'receive': '0',
                    'write': '0',
                    'move': 'left -> Q9'
                },
            ],
            'Q9': [
                {
                    'receive': '1',
                    'write': '1',
                    'move': 'left'
                },
                {
                    'receive': 'B',
                    'write': 'B',
                    'move': 'right -> Q10'
                },
            ],
            'Q10': [
                {
                    'receive': '0',
                    'write': 'B',
                    'move': 'right -> Q21'
                },
                {
                    'receive': '1',
                    'write': 'B',
                    'move': 'right -> Q11'
                },
            ],
            'Q11': [
                {
                    'receive': '1',
                    'write': '1',
                    'move': 'right'
                },
                {
                    'receive': '0',
                    'write': '0',
                    'move': 'right -> Q12'
                },
            ],
            'Q12': [
                {
                    'receive': 'B',
                    'write': 'B',
                    'move': 'right -> Q13'
                },
            ],
            'Q13': [
                {
                    'receive': '1',
                    'write': 'Z',
                    'move': 'right -> Q14'
                },
                {
                    'receive': 'X',
                    'write': 'X',
                    'move': 'left -> Q18'
                },
                {
                    'receive': 'Y',
                    'write': 'Y',
                    'move': 'left -> Q18'
                },
            ],
            'Q14': [
                {
                    'receive': '1',
                    'write': '1',
                    'move': 'right'
                },
                {
                    'receive': 'Y',
                    'write': 'Y',
                    'move': 'right -> Q15'
                },
                {
                    'receive': 'Z',
                    'write': 'Z',
                    'move': 'right -> Q15'
                },
            ],
            'Q15': [
                {
                    'receive': '1',
                    'write': '1',
                    'move': 'right'
                },
                {
                    'receive': 'B',
                    'write': '1',
                    'move': 'left -> Q16'
                },
            ],
            'Q16': [
                {
                    'receive': '1',
                    'write': '1',
                    'move': 'left'
                },
                {
                    'receive': 'Y',
                    'write': 'Y',
                    'move': 'left -> Q17'
                },
                {
                    'receive': 'X',
                    'write': 'X',
                    'move': 'left -> Q17'
                },
            ],
            'Q17': [
                {
                    'receive': '1',
                    'write': '1',
                    'move': 'left'
                },
                {
                    'receive': 'Z',
                    'write': 'Z',
                    'move': 'right -> Q13'
                },
            ],
            'Q18': [
                {
                    'receive': 'B',
                    'write': 'B',
                    'move': 'left -> Q19'
                },
                {
                    'receive': 'Z',
                    'write': '1',
                    'move': 'left'
                },
            ],
            'Q19': [
                {
                    'receive': '0',
                    'write': '0',
                    'move': 'left -> Q20'
                },
            ],
            'Q20': [
                {
                    'receive': '1',
                    'write': '1',
                    'move': 'left'
                },
                {
                    'receive': 'B',
                    'write': 'B',
                    'move': 'right -> Q10'
                },
            ],
            'Q21': [
                {
                    'receive': 'B',
                    'write': 'B',
                    'move': 'right -> Q22'
                },
            ],
            'Q22': [
                {
                    'receive': '1',
                    'write': 'B',
                    'move': 'right'
                },
                {
                    'receive': 'X',
                    'write': 'X',
                    'move': 'right -> Q23'
                },
                {
                    'receive': 'Y',
                    'write': 'Y',
                    'move': 'right -> Q23'
                },
            ],
            'Q23': [
                {
                    'receive': '1',
                    'write': '1',
                    'move': 'right'
                },
                {
                    'receive': 'B',
                    'write': 'B',
                    'move': 'right -> end'
                },
            ],
            'Q24': [
                {
                    'receive': 'X',
                    'write': 'B',
                    'move': 'right -> Q25'
                },
                {
                    'receive': 'Y',
                    'write': 'B',
                    'move': 'right -> Q25'
                },
            ],
            'Q25': [
                {
                    'receive': '1',
                    'write': 'B',
                    'move': 'right'
                },
                {
                    'receive': 'B',
                    'write': 'B',
                    'move': 'right -> end'
                },
            ],
            'Q26': [
                {
                    'receive': '0',
                    'write': 'B',
                    'move': 'left -> Q27'
                },
            ],
            'Q27': [
                {
                    'receive': '1',
                    'write': 'B',
                    'move': 'left'
                },
                {
                    'receive': 'B',
                    'write': 'Y',
                    'move': 'right -> Q28'
                },
            ],
            'Q28': [
                {
                    'receive': 'B',
                    'write': 'X',
                    'move': 'right -> Q29'
                },
            ],
            'Q29': [
                {
                    'receive': 'B',
                    'write': 'B',
                    'move': 'right -> end'
                },
            ],
            'end':[]
        }
    },

    'pembagian':
    {
        'start-state': 'start',
        'end-state': 'end',

        'states':
        {
            'start': [
                {
                    'receive': '0',
                    'write': 'B',
                    'move': 'right -> Q24'
                },
                {
                    'receive': 'X',
                    'write': 'B',
                    'move': 'right -> Q1'
                },
                {
                    'receive': 'Y',
                    'write': 'B',
                    'move': 'right -> Q4'
                },
            ],
            'Q1': [
                {
                    'receive': '0',
                    'write': '0',
                    'move': 'right -> Q2'
                },
                {
                    'receive': '1',
                    'write': '1',
                    'move': 'right'
                },
            ],
            'Q2': [
                {
                    'receive': 'X',
                    'write': 'B',
                    'move': 'right -> Q6'
                },
                {
                    'receive': 'Y',
                    'write': 'B',
                    'move': 'right -> Q3'
                },
                {
                    'receive': 'B',
                    'write': 'B',
                    'move': 'left -> Q26'
                },
            ],
            'Q3': [
                {
                    'receive': '1',
                    'write': '1',
                    'move': 'right'
                },
                {
                    'receive': 'B',
                    'write': 'Y',
                    'move': 'left -> Q7'
                },
            ],
            'Q4': [
                {
                    'receive': '1',
                    'write': '1',
                    'move': 'right'
                },
                {
                    'receive': '0',
                    'write': '0',
                    'move': 'right -> Q5'
                },
            ],
            'Q5': [
                {
                    'receive': 'X',
                    'write': 'B',
                    'move': 'right -> Q3'
                },
                {
                    'receive': 'Y',
                    'write': 'B',
                    'move': 'right -> Q6'
                },
                {
                    'receive': 'B',
                    'write': 'B',
                    'move': 'right -> Q26'
                },
            ],
            'Q6': [
                {
                    'receive': '1',
                    'write': '1',
                    'move': 'right'
                },
                {
                    'receive': 'B',
                    'write': 'X',
                    'move': 'left -> Q7'
                },
            ],
            'Q7': [
                {
                    'receive': '1',
                    'write': 'Z',
                    'move': 'left -> Q8'
                },
                {
                    'receive': 'B',
                    'write': 'B',
                    'move': 'right -> Q14'
                },
            ],
            'Q8': [
                {
                    'receive': '1',
                    'write': '1',
                    'move': 'left'
                },
                {
                    'receive': 'B',
                    'write': 'B',
                    'move': 'left -> Q9'
                },
            ],
            'Q9': [
                {
                    'receive': '0',
                    'write': '0',
                    'move': 'left -> Q10'
                },
            ],
            'Q10': [
                {
                    'receive': 'Z',
                    'write': 'Z',
                    'move': 'left'
                },
                {
                    'receive': '1',
                    'write': 'Z',
                    'move': 'right -> Q11'
                },
                {
                    'receive': 'B',
                    'write': 'B',
                    'move': 'right -> Q17'
                },
            ],
            'Q11': [
                {
                    'receive': 'Z',
                    'write': 'Z',
                    'move': 'right'
                },
                {
                    'receive': '0',
                    'write': '0',
                    'move': 'right -> Q12'
                },
            ],
            'Q12': [
                {
                    'receive': 'B',
                    'write': 'B',
                    'move': 'right -> Q13'
                },
            ],
            'Q13': [
                {
                    'receive': '1',
                    'write': '1',
                    'move': 'right'
                },
                {
                    'receive': 'Z',
                    'write': 'Z',
                    'move': 'left -> Q7'
                },
            ],
            'Q14': [
                {
                    'receive': 'X',
                    'write': 'X',
                    'move': 'right -> Q15'
                },
                {
                    'receive': 'Y',
                    'write': 'Y',
                    'move': 'right -> Q15'
                },
                {
                    'receive': 'Z',
                    'write': '1',
                    'move': 'right'
                },
            ],
            'Q15': [
                {
                    'receive': '1',
                    'write': '1',
                    'move': 'right'
                },
                {
                    'receive': 'B',
                    'write': '1',
                    'move': 'left -> Q16'
                },
            ],
            'Q16': [
                {
                    'receive': '1',
                    'write': '1',
                    'move': 'left'
                },
                {
                    'receive': 'Y',
                    'write': 'Y',
                    'move': 'left -> Q7'
                },
                {
                    'receive': 'X',
                    'write': 'X',
                    'move': 'left -> Q7'
                },
            ],
            'Q17': [
                {
                    'receive': '0',
                    'write': 'B',
                    'move': 'right -> Q18'
                },
                {
                    'receive': 'Z',
                    'write': 'B',
                    'move': 'right -> Q17'
                },
            ],
            'Q18': [
                {
                    'receive': 'B',
                    'write': 'B',
                    'move': 'right -> Q19'
                },
            ],
            'Q19': [
                {
                    'receive': '1',
                    'write': 'B',
                    'move': 'right'
                },
                {
                    'receive': 'Z',
                    'write': 'B',
                    'move': 'right -> Q20'
                },
            ],
            'Q20': [
                {
                    'receive': 'X',
                    'write': 'X',
                    'move': 'right -> Q21'
                },
                {
                    'receive': 'Y',
                    'write': 'Y',
                    'move': 'right -> Q21'
                },
                {
                    'receive': 'Z',
                    'write': 'B',
                    'move': 'right -> Q22'
                },
            ],
            'Q21': [
                {
                    'receive': 'B',
                    'write': 'B',
                    'move': 'right -> end'
                },
                {
                    'receive': '1',
                    'write': '1',
                    'move': 'right'
                },
            ],
            'Q22': [
                {
                    'receive': 'Z',
                    'write': 'B',
                    'move': 'right -> Q22'
                },
                {
                    'receive': 'X',
                    'write': 'B',
                    'move': 'right -> Q23'
                },
                {
                    'receive': 'Y',
                    'write': 'B',
                    'move': 'right -> Q23'
                },
            ],
            'Q23': [
                {
                    'receive': '1',
                    'write': 'B',
                    'move': 'right'
                },
                {
                    'receive': 'B',
                    'write': 'Y',
                    'move': 'right -> Q28'
                },
            ],
            'Q24': [
                {
                    'receive': 'X',
                    'write': 'B',
                    'move': 'right -> Q25'
                },
                {
                    'receive': 'Y',
                    'write': 'B',
                    'move': 'right -> Q25'
                },
                {
                    'receive': 'B',
                    'write': 'Y',
                    'move': 'right -> Q28'
                },
            ],
            'Q25': [
                {
                    'receive': '1',
                    'write': 'B',
                    'move': 'right'
                },
                {
                    'receive': 'B',
                    'write': 'B',
                    'move': 'right -> end'
                },
            ],
            'Q26': [
                {
                    'receive': '0',
                    'write': 'B',
                    'move': 'left -> Q27'
                },
            ],
            'Q27': [
                {
                    'receive': '1',
                    'write': 'B',
                    'move': 'left'
                },
                {
                    'receive': 'B',
                    'write': 'Y',
                    'move': 'right -> Q28'
                },
            ],
            'Q28': [
                {
                    'receive': 'B',
                    'write': 'X',
                    'move': 'right -> Q29'
                },
            ],
            'Q29': [
                {
                    'receive': 'B',
                    'write': 'B',
                    'move': 'right -> end'
                },
            ],
            'end':[]
        }
    },
}
