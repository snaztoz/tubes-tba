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
                    'receive': '1',
                    'write': null,
                    'move': 'right -> find-middle-0-from-left'
                },
                {
                    'receive': '0',
                    'move': 'right -> end'
                }
            ],

            'find-middle-0-from-left': [
                {
                    'receive': '1',
                    'move': 'right'
                },
                {
                    'receive': '0',
                    'move': 'right -> find-B-from-left'
                }
            ],

            'find-B-from-left': [
                {
                    'receive': '1',
                    'move': 'right'
                },
                {
                    'receive': 'B',
                    'write': '1',
                    'move': 'left -> find-middle-0-from-right'
                }
            ],

            'find-middle-0-from-right': [
                {
                    'receive': '1',
                    'move': 'left'
                },
                {
                    'receive': '0',
                    'move': 'left -> find-B-from-right'
                }
            ],

            'find-B-from-right': [
                {
                    'receive': '1',
                    'move': 'left'
                },
                {
                    'receive': 'B',
                    'move': 'right -> start'
                }
            ],

            'end': []
        }
    }
}
