const operations = {
    // Ini belum support operasi yang mengandung angka negatif
    'penjumlahan': 
    {
        'start-state': 'start',
        'end-state': 'done',

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
                {
                    'receive': 'Z',
                    'move': 'right -> done'
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
                {
                    'receive': 'Z',
                    'move': 'right -> end'
                }
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
}
