# Изменение маршрутов bug-runner

Для измененеия маршрутов следует задать специальный объект, который передается в метод setAnimation. Данный объект включает в себя следующие поля:

```
'cockraoch control': {
		r: {
			k: [
				{
					s: [0], // начальный угол поворота
				},
				{
					s: [0], // конечный угол поворота
				},
			],
		},
		p: {
			k: [
				{
					s: [833, 573, 0], // координаты начала анимации
					to: [-200, -150, 0], // вектор направления движения
				},
				{
					s: [0, 0, 0], // конечная точка завершения анимации
				},
			],
		},
	},
```

`cockraoch control` - это имя того жука, для которого требуется задать иной маршрут, всего их 4:

`cockraoch control`

`cockraoch control 2`

`cockraoch control 3`

`cockraoch control 4`