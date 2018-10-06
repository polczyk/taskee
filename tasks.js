const tasks = [{
  name: 'Zakupy',
  subTasks: [{
      name: 'Auchan',
      subTasks: [{
          name: 'Pieluchy'
        },
        {
          name: 'Kompot'
        }
      ]
    },
    {
      name: 'Carrefour',
      subTasks: [{
          name: 'Papierosy',
          subTasks: []
        },
        {
          name: 'Woda'
        }
      ]
    }
  ]
},
{
  name: 'Study',
  subTasks: [{
      name: 'Exams',
      subTasks: [{
          name: 'Math',
        },
        {
          name: 'History',
          subTasks: [
            {
              name: 'Medieval Times'
            },
            {
              name: 'Industrialisation'
            }
          ]
        }
      ]
    },
    {
      name: 'Research'
    }
  ]
}
];

export default tasks;
