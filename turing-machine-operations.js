const operations = {
    // Ini belum support operasi yang mengandung angka negatif
    'penjumlahan': 
    {
        'start-state': 'Q0',
        'end-state': 'end',

        'states':
        {
            'Q0': [
                {
                    'receive': 'X',
                    'write': null,
                    'move': 'right -> Q1'
                },
                {
                    'receive': '0',
                    'write': 'B',
                    'move': 'right -> Q13'
                }
            ],

            'Q1': [
                {
                    'receive': '1',
                    'write':'B',
                    'move': 'right -> Q2'
                },
                {
                    'receive': '0',
                    'write':'B',
                    'move': 'left -> Q8'
                }
            ],

            'Q2': [
                {
                    'receive': '1',
                    'move': 'right'
                },
                {
                    'receive': '0',
                    'move': 'right -> Q3'
                }
            ],

            'Q3': [
                {
                    'receive': 'X',
                    'move': 'right -> Q4'
                },
                {
                    'receive': 'B',
                    'move': 'left -> Q9'
                },
                {
                    'receive': 'Y',
                    'move': 'right -> Q10'
                },
            ],

            'Q4': [
                {
                    'receive': '1',
                    'move': 'right'
                },
                {
                    'receive': 'B',
                    'write': '1',
                    'move': 'left -> Q5'
                }
            ],

            'Q5': [
                {
                    'receive': '1',
                    'write': '1',
                    'move': 'left'
                },
                {
                    'receive': 'X',
                    'write': 'X',
                    'move': 'left -> Q6'
                },
            ],
            
            'Q6': [
                {
                    'receive': '0',
                    'write': '0',
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
                    'move': 'right -> Q1'
                },
            ],
            
            'Q8': [
                {
                    'receive': 'B',
                    'write': 'B',
                    'move': 'left'
                },
                {
                    'receive': 'X',
                    'write': 'B',
                    'move': 'right -> Q14'
                },
            ],
            
            'Q9': [
                {
                    'receive': '0',
                    'write': 'B',
                    'move': 'left -> Q15'
                }
            ],
            
            'Q10': [
                {
                    'receive': '1',
                    'write': '1',
                    'move': 'right'
                },
                {
                    'receive': 'B',
                    'write': 'B',
                    'move': 'left -> Q11'
                },
            ],
            
            'Q11': [
                {
                    'receive': '1',
                    'write': 'B',
                    'move': 'left -> Q12'
                },
                {
                    'receive': 'Y',
                    'write': 'Y',
                    'move': 'left -> Q17'
                },
            ],
            
            'Q12': [
                {
                    'receive': '1',
                    'write': '1',
                    'move': 'left'
                },
                {
                    'receive': 'Y',
                    'write': 'Y',
                    'move': 'left -> Q6'
                },
            ],
            
            'Q13': [
                {
                    'receive': 'B',
                    'write': 'B',
                    'move': 'right -> end'
                },
                {
                    'receive': 'X',
                    'write': 'X',
                    'move': 'right -> Q24'
                },
            ],
            
            'Q14': [
                {
                    'receive': 'B',
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
            
            'Q15': [
                {
                    'receive': '1',
                    'write': '1',
                    'move': 'left'
                },
                {
                    'receive': 'B',
                    'write': '1',
                    'move': 'right -> Q16'
                },
            ],
            
            'Q16': [
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
            
            'Q17': [
                {
                    'receive': '0',
                    'write': '0',
                    'move': 'left -> Q18'
                }
            ],
            
            'Q18': [
                {
                    'receive': 'B',
                    'write': 'B',
                    'move': 'left'
                },
                {
                    'receive': '1',
                    'write': '1',
                    'move': 'left'
                },
                {
                    'receive': 'X',
                    'write': 'X',
                    'move': 'right -> Q19'
                },
            ],
            
            'Q19': [
                {
                    'receive': '1',
                    'write': '1',
                    'move': 'right'
                },
                {
                    'receive': 'B',
                    'write': '1',
                    'move': 'right -> Q20'
                },
            ],
            
            'Q20': [
                {
                    'receive': 'B',
                    'write': 'B',
                    'move': 'right'
                },
                {
                    'receive': '0',
                    'write': 'B',
                    'move': 'right -> Q21'
                },
                {
                    'receive': '1',
                    'write': 'B',
                    'move': 'left -> Q18'
                },
            ],
            
            'Q21': [
                {
                    'receive': 'Y',
                    'write': 'B',
                    'move': 'right -> Q22'
                }
            ],
            
            'Q22': [
                {
                    'receive': 'B',
                    'write': 'B',
                    'move': 'right -> end'
                }
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

            'end': []
        }
    },
   
    'pengurangan': {
        
        'start-state': 'Q0',
        'end-state': 'end',
    
        'states':
        {
            'Q0': [
                {
                    'receive': 'X',
                    'write': null,
                    'move': 'right -> Q1'
                },
                {
                    'receive': '0',
                    'write': 'B',
                    'move': 'right -> Q13'
                }
            ],
    
            'Q1': [
                {
                    'receive': '1',
                    'write':'B',
                    'move': 'right -> Q2'
                },
                {
                    'receive': '0',
                    'write':'B',
                    'move': 'left -> Q8'
                }
            ],
    
            'Q2': [
                {
                    'receive': '1',
                    'move': 'right'
                },
                {
                    'receive': '0',
                    'move': 'right -> Q3'
                }
            ],
    
            'Q3': [
                {
                    'receive': 'X',
                    'move': 'right -> Q10'
                },
                {
                    'receive': 'B',
                    'move': 'left -> Q9'
                },
                {
                    'receive': 'Y',
                    'move': 'right -> Q4'
                },
            ],
    
            'Q4': [
                {
                    'receive': '1',
                    'move': 'right'
                },
                {
                    'receive': 'B',
                    'write': '1',
                    'move': 'left -> Q5'
                }
            ],
    
            'Q5': [
                {
                    'receive': '1',
                    'write': '1',
                    'move': 'left'
                },
                {
                    'receive': 'Y',
                    'write': 'Y',
                    'move': 'left -> Q6'
                },
            ],
            
            'Q6': [
                {
                    'receive': '0',
                    'write': '0',
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
                    'move': 'right -> Q1'
                },
            ],
            
            'Q8': [
                {
                    'receive': 'B',
                    'write': 'B',
                    'move': 'left'
                },
                {
                    'receive': 'X',
                    'write': 'B',
                    'move': 'right -> Q14'
                },
            ],
            
            'Q9': [
                {
                    'receive': '0',
                    'write': 'B',
                    'move': 'left -> Q15'
                }
            ],
            
            'Q10': [
                {
                    'receive': '1',
                    'write': '1',
                    'move': 'right'
                },
                {
                    'receive': 'B',
                    'write': 'B',
                    'move': 'left -> Q11'
                },
            ],
            
            'Q11': [
                {
                    'receive': '1',
                    'write': 'B',
                    'move': 'left -> Q12'
                },
                {
                    'receive': 'X',
                    'write': 'X',
                    'move': 'left -> Q17'
                },
            ],
            
            'Q12': [
                {
                    'receive': '1',
                    'write': '1',
                    'move': 'left'
                },
                {
                    'receive': 'X',
                    'write': 'X ',
                    'move': 'left -> Q6'
                },
            ],
            
            'Q13': [
                {
                    'receive': 'B',
                    'write': 'B',
                    'move': 'right -> end'
                },
                {
                    'receive': 'X',
                    'write': 'Y',
                    'move': 'right -> Q24'
                },
            ],
            
            'Q14': [
                {
                    'receive': 'B',
                    'write': 'B',
                    'move': 'right'
                },
                {
                    'receive': 'X',
                    'write': 'Y',
                    'move': 'right -> Q23'
                },
                {
                    'receive': 'Y',
                    'write': 'X',
                    'move': 'right -> Q23'
                },
            ],
            
            'Q15': [
                {
                    'receive': '1',
                    'write': '1',
                    'move': 'left'
                },
                {
                    'receive': 'B',
                    'write': '1',
                    'move': 'right -> Q16'
                },
            ],
            
            'Q16': [
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
            
            'Q17': [
                {
                    'receive': '0',
                    'write': '0',
                    'move': 'left -> Q18'
                }
            ],
            
            'Q18': [
                {
                    'receive': 'B',
                    'write': 'B',
                    'move': 'left'
                },
                {
                    'receive': '1',
                    'write': '1',
                    'move': 'left'
                },
                {
                    'receive': 'X',
                    'write': 'X',
                    'move': 'right -> Q19'
                },
            ],
            
            'Q19': [
                {
                    'receive': '1',
                    'write': '1',
                    'move': 'right'
                },
                {
                    'receive': 'B',
                    'write': '1',
                    'move': 'right -> Q20'
                },
            ],
            
            'Q20': [
                {
                    'receive': 'B',
                    'write': 'B',
                    'move': 'right'
                },
                {
                    'receive': '0',
                    'write': 'B',
                    'move': 'right -> Q21'
                },
                {
                    'receive': '1',
                    'write': 'B',
                    'move': 'left -> Q18'
                },
            ],
            
            'Q21': [
                {
                    'receive': 'X',
                    'write': 'B',
                    'move': 'right -> Q22'
                }
            ],
            
            'Q22': [
                {
                    'receive': 'B',
                    'write': 'B',
                    'move': 'right -> end'
                }
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
    
            'end': []
        }
    }
}
